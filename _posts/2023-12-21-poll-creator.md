---
title: 'Poll Creator Pro Max Ultra'
date: 2023-12-21
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - projects
tags:
  - WebDev
  - Svelte
  - Docker
  - Express
  - Microservices
---

## :thinking: What is Poll Creator Pro Max Ultra?

Poll Creator Pro Max Ultra is a web app that allows users to create polls and vote on them. It's my final project for CS426 Scalable Web System. It is a microservice-based web app, with a frontend written in Svelte, and a backend written in Express. The frontend and backend are containerized using Docker, and the containers are orchestrated using Docker Compose.

### :keyboard: Source Code:

[Github Repository](https://github.com/zzuo123/Poll-Creator-Pro-Max-Ultra)

### :tv: Demo Video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/RUrfHlBX4GQ?si=-_EUXqqUiBqM8g8C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### :computer: Test it out yourself:

1. Clone the repository at: [https://github.com/zzuo123/Poll-Creator-Pro-Max-Ultra](https://github.com/zzuo123/Poll-Creator-Pro-Max-Ultra)
2. Download and install [Docker](https://www.docker.com/products/docker-desktop).
3. Open a terminal and navigate to the root directory of the repository.
4. Run `docker-compose -f docker-compose.dev.yml up --build` to build and run the containers.

That's it! You can now access the web app at [http://localhost:3000](http://localhost:3000).


## :thinking: Why did I make it?

### For CS426 Scalable Web Systems

This project is my final project for CS426 Scalable Web Systems. For this project, I was required to create a web app that runs on multiple docker containers, each being a microservice, as well as a database that stores useful data. I was also required to use Svelte for the frontend, and Express for the backend. I was also required to use Docker Compose to orchestrate the containers.

### It's a useful tool

While there are *many* poll creator tools online, they either have a lot of ads, or they require you to sign up. I wanted to create a poll creator that is free, and doesn't require you to sign up. I also wanted to create a poll creator that is easy to use, and has a nice UI.




## :nerd_face: How does it work?

### Schema/Diagram

![Design Diagram](/assets/images/blog_images/poll-creator/20231207_220144.jpg)

### Frontend (Svelte routing with parameters)

The frontend is written in Svelte. It uses Svelte's slug feature to create a multi page app with url parameters. The way it works is that when creating the folder structure in the `src/routes` folder, if we create a folder whose name is the desired parameter wrapped in brackets (i.e. `[param]`), then Svelte will create a page that can be accessed at `/param`. For example, I want the search functionality to have a URL of `/search/:term`, so I created a `search` folder within the `src/routes` folder, and within that folder, I created a `[term]` folder with an `+page.svelte` file, which would be the default page for the search functionality.

But here is comes the question: how do we access the `term` parameter? Well, we can use the `page` store. Here is some sample code for that:
    
```html
<script>
import { page } from '$app/stores';
$: term = $page.params.term;
</script>

<h1>You searched for term: {term}</h1>
```
Pretty simple, right? We just import the `page` store, and then we can access the `term` parameter using `$page.params.term`. We can then use that parameter to search for polls with that term.

### Backend

#### Storing Polls and Votes/Options separately

I have engineered the backend services so that the polls and the votes/options are stored separately. This is because while the poll itself won't be changed much after creation, the votes/options need to be updated very often. If we store them together, then we would have to update the entire poll every time someone votes, which would be inefficient. By storing them separately, we can update the votes and options without having to involve the poll itself. Therefore, the polls service mainly serves the poll CRUD (create, read, update, delete), while the votes service creates the vote option and updates the vote counts. 

#### The event bus

The event bus handles communication between the polls and the votes service. A poll deletion in the polls service would need to trigger the vote service to also delete the associated votes and options. The votes service also updates the poll service on the vote counts of the polls, where it stores the update in a buffer and checks for updates of the buffer every second using setInterval, and sends the update to the poll service if there is any. This is to prevent the poll service from being overwhelmed by the number of updates. 

#### The search service

Then there is also the search service, which connects to the poll collection and has an endpoint for searching for polls that contain user-specified keywords, and an endpoint for getting the top polls by vote count. These are the computational intensive services, so I separated them from the poll service.

#### The query service

Lastly, there is the query service, which is the service that the frontend/client talks to. It has endpoints specifically designed to get the information that the front end needs from the other services and combine them into a format that can be used directly by the front end. This is to prevent the front end from having to talk to multiple services to get the information it needs, which would be inefficient. 

### Database

The database is a MongoDB database. It uses a single database, but as mentioned before, the polls are stored in the polls collection while the votes/options are stored in the votes collection.

### Docker

The frontend, backend, and database are all containerized using Docker. Each one of the services has their own `Dockerfile` which creates the image and properly configures the volume for syncing the logs from container to host. The containers are orchestrated using Docker Compose (`docker_compose.dev.yml`), which automatically creates a network for the containers to communicate with each other. The frontend is exposed to the host on port 3000, and the backends uses ports 4000-4004. 


## :hammer_and_wrench: Technologies Used

### Frontend

- Svelte
- SvelteKit
- Bootstrap
- Google Fonts
- HTML, CSS, JS

### Backend

- Express
- MongoDB
- CORS
- Morgan (for logging)
- Winston (for logging)
- Nodemon (for hot reloading)
- PM2 (for load balancing)

### DevOps

- Docker
- Docker Compose
- Git and Github

## Next Steps

- Add a user system
- Add a way to share polls (link or QR code?)
- Deploy the app to a cloud service