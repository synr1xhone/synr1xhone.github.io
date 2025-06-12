---
title: 'My experience with MCP and OpenWebUI'
date: 2025-6-12
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - blog 
tags:
  - AI
  - LLM
  - Open Source
  - Self Hosting
---

## Introduction/Background

[OpenWebUI](https://github.com/open-webui/open-webui) is an open-source self-hosted AI interface that provides a user-friendly web interface for Ollama and OpenAI-Compatible APIs. It also support advance features such as RAG and tool usage (which is what this post is going to be about). I have been self-hosting OpenWebUI for about a year now, it serves as a cost-effective way for me to explore the various models from OpenAI. Check out [this post]() if you want to learn more about my self-hosting experience.

![OpenWebUI Home Page](https://i.ibb.co/DgYn8p1x/openwebui.png)
*OpenWebUI Home Page*

Anyway, I have been wanting to explore [MCP](https://modelcontextprotocol.io/introduction) for a while now. It's a framework to standardize how LLM models integrate and share data with external tools/components, essentially serving as a bridge between LLM's parametric knowledge and the outside world. My first exposure to MCP was from tech influencers like [John Capobianco](https://www.youtube.com/@johncapobianco2527) and [Laurie Kirk](https://www.youtube.com/@lauriewired) who posted numerous videos on YouTube applying this amazing framework to assist in areas such as Network Engineering and Reverse Engineering, and I recommend you to check out their videos. After my master's graduation from UMass Amherst in May this year, I finally have some time to check out this latest technology.

## First MCP Server

To set up my first MCP server, I followed the tutorial from [MCP Python SDK GitHub](https://github.com/modelcontextprotocol/python-sdk) page and created the `math_server.py` file, which is a simple MCP server that provides LLMs an addition tool and a multiplication tool for precise math calculation.

```python
# math_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Math")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two numbers"""
    return a * b

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

As for client, I found and modified a piece of code from GitHub (however I cannot find it again, so if you would like to be attributed please contact me via email). It uses LangGraph to create a ReAct workflow where the gpt-4o-mini model can dynamically interact with the MCP math tools. 

```python
# client.py
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.prebuilt import ToolNode, tools_condition
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
import asyncio
import pprint

async def main():
    model = init_chat_model("openai:gpt-4o-mini")
    
    client = MultiServerMCPClient(
        {
            "math": {
                "command": "uv",
                # Make sure to update to the full absolute path to your math_server.py file
                "args": ["run",
                         "python",
                         "./math_server.py"],
                "transport": "stdio",
            }
        }
    )
    tools = await client.get_tools()
    
    def call_model(state: MessagesState):
        response = model.bind_tools(tools).invoke(state["messages"])
        return {"messages": response}
    
    builder = StateGraph(MessagesState)
    builder.add_node(call_model)
    builder.add_node(ToolNode(tools))
    builder.add_edge(START, "call_model")
    builder.add_conditional_edges(
        "call_model",
        tools_condition,
    )
    builder.add_edge("tools", "call_model")
    graph = builder.compile()
    math_response = await graph.ainvoke({"messages": "what is (12345432+4321432154)x123"})
    pprint.pprint(math_response)
    
if __name__ == "__main__":
    # set up openai api environment variable from .env file
    load_dotenv()
    asyncio.run(main())
```

To run this code, all you need to do is install the [uv](https://github.com/astral-sh/uv) package manager, place your OpenAI API key in a `.env` file in the same directory or export to `OPENAI_API_KEY` environment variable, then run the following code:

```bash
# install some required packages
uv add "mcp[cli]" "langgraph" "dotenv" "pprint" "asyncio" "langchain" "langchain_mcp_adapters"
# run the client, which will automatically start the server if required
uv run python client.py
```

Here is how the output looks like:

![MCP Client output with calculated result](https://i.ibb.co/WN2G1PHJ/image.png)
*MCP Client Output*

As we can see, with the help of two tool calls to "add" and "multiply", gpt-4o-mini was able to successfully calculate the correct answer to `(12345432+4321432154)x123`, which is `533054643078`. gpt-4o-mini on its own simply cannot handle calculating number this big, as we can see from the screenshot below.

![vanilla gpt-4o-mini calculated output](https://i.ibb.co/R44bjsMQ/image.png)
*Vanilla GPT-4o-mini output*

However, having to pop open the terminal, edit the python program and change the model prompt to use this MCP tool is just way too inconvenient. That's why I decided to integrate this MCP tool into OpenWebUI.

## Integrating MCP tool into OpenWebUI

This part is such as roller coaster ride, so brace yourself for some hardcore debugging and network engineering.

To connect OpenAI models in OpenWebUI to MCP servers, we would need an adapter to translate the MCP protocol to be OpenAPI compatible. This process also hide the primitive `stdio` connection with MCP server inside a more standardized `http` connection. Luckily, there is already a tool available called [mcpo](https://github.com/open-webui/mcpo) that is also recommended by the OpenWebUI team. Since I am running my self-hosted services as docker containers, I plan to continue this tradition and run mcpo in a docker container. To do that, I added the following line to the end of my docker compose file:

```docker
mcpo:
  container_name: mcpo
  image: ghcr.io/open-webui/mcpo:main
  ports:
    - "8000:8000"
  command: --config /openwebui_mcp/config.json --api-key "<secret key used for authenticating this OpenAPI server>"
  volumes:
    - ./openwebui_mcp:/openwebui_mcp
```

Then, I made a new folder in the same directory as the docker compose file called openwebui_mcp where I will be putting all the necessary files for the mcp server and mcpo adapter. Here are the files:

```json
// config.json 
{
  "mcpServers": {
    "mcp_test": {
      "command": "uv",
      "args": ["run",
               "mcp",
               "run",
               "./math_server.py"
      ]
    }
  }
}
```

```python
# math_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Math")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two numbers"""
    return a * b

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

Assuming `uv` and all the necessary packages are install, this should be good enough. Then, I ran `docker compose up -d` to spin up all the docker containers, then tested the server using curl. Sure enough, it worked:

```bash
$ curl localhost:8000
{"detail":"Not Found"}

$ curl localhost:8000/openapi.json
{"openapi":"3.1.0","info":{"title":"MCP OpenAPI Proxy","description":"Automatically generated API from MCP Tool Schemas\n\n- **available tools**：\n    - [mcp_test](/mcp_test/docs)","version":"1.0"},"paths":{}}
```

However, when I went to OpenWebUI and tried adding `mcpo:8000`(mcpo docker container IP), or `xxx.xx.xx.xx:8000` (server's IP), or `0.0.0.0:8000` (all interfaces) to the tool tab, none of them connects. This didn't make any sense, as the mcpo adapter is clearly up and running, and is accessible from the server host. As a last resort, I decided to expose the mcpo http server to the outside internet through Nginx Reverse Proxy and access it via a subdomain of my public domain. Sure enough it worked.

![MCP Tools inside of OpenWebUI](https://i.ibb.co/qYKjVXxD/Screenshot-20250612-144805.png)
*MCP Tools inside of OpenWebUI*

However, for some reason the tools aren't being used by the model at all. Even though the tools shows up as available in the UI, gpt-4.1-mini simply refuse to use them and instead always rely on parametric knowledge. When asked about it, it simply says no tools are available. This is unacceptable! After countless hours of debugging and browsing through OpenWebUI's GitHub Issues (for some reasons the devs seems passive agressive in some replies, which I kind of get, but please be nice sometimes, we are all just trying to learn), I finally found a solution, which is switching to `native` tool calls from `default` in the conversation setting. Once I changed that setting, gpt-4.1-mini finally has access to the tools and is making tool calls.

![MCP Tool in action in OpenWebUI](https://i.ibb.co/HDHG0M8m/image.png)
*MCP Tool in action in OpenWebUI using GPT-4.1-mini*

As some of you have already noticed, it seems like currently ReAct like interleaved reasoning/thinking and tool usage isn't currently supported in OpenWebUI (or it could be a configuration issue). So for now, I will be defaulting to testing ReAct functionality using the python script in the previous section using LangGraph. But hopefully one day this feature will be added and I can use it in OpenWebUI. 

# Conclusion

This has been a fun learning experience for me. I learned a ton about the MCP protocol, OpenAPI tools protocol, as well as network debugging. Hopefully is fun for you to read and you learn something too! :smile:
