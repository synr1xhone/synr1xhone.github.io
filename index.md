---
layout: splash
permalink: /
hidden: true
header:
  overlay_image: /assets/images/home-bg.jpg
  overlay_filter: 0.5
  caption: "图片来源: [Unsplash](https://unsplash.com)"
  actions:
    - label: "<i class='fas fa-fw fa-book-reader'></i> 查看我的博客"
      url: "/year-archive/"
title: "你好，我是思远"
excerpt: >
  <span id="typed-text"></span><br />
  我对人是如何思考、学习和创造非常好奇。
---

<!-- =================================================================== -->
<!--      全新的“头像居左，文字居右”的“关于我”模块                 -->
<!-- =================================================================== -->

<div class="feature__wrapper" style="margin-top: 2em;">
  <div class="feature__item--left">
    <a href="/about/">
      <img src="/assets/images/siyuan-avatar.jpg" alt="思远" style="border-radius: 15px;">
    </a>
  </div>
  <div class="feature__item--right">
    <h2>About Me / 关于我</h2>
    <p>I'm especially interested in artificial intelligence. I want to understand how AI can think, and how it can help people learn better.</p>
    <p><small>我特别对人工智能感兴趣。我想了解 AI 是如何“思考”的，以及它如何帮助人类更好地学习。</small></p>
    <p>In the future, I hope to study neuroscience so I can understand how the brain works, and how that connects to AI.</p>
    <p><small>未来我希望学习一些脑神经科学的知识，以更好地理解大脑的工作方式，并将其与 AI 联系起来。</small></p>
    <p>This blog is where I write down my thoughts, learning notes, and quotes from books.</p>
    <p><small>这个博客是我用来记录思考、学习笔记和读书摘录的地方。</small></p>
    <p>...</p> <!-- 更多介绍可以放在独立的 /about/ 页面 -->
    <a href="/about/" class="btn btn--inverse">了解更多</a>
  </div>
</div>


<!-- =================================================================== -->
<!--      打字机效果的“魔法”脚本 (保持不变)                           -->
<!-- =================================================================== -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
<script>
  var typed = new Typed('#typed-text', {
    strings: [
      "我是一名高中生。",
      "I am a High School Student.",
      "我是一名探索者。",
      "I am a Curious Explorer.",
      "我是一名未来的工程师。",
      "I am an Aspiring Engineer."
    ],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
    showCursor: true,
    cursorChar: ' |'
  });
</script>
