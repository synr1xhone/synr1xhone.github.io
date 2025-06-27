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
<!--      全新的、最终版的“关于我”模块 (使用 Flexbox 布局)           -->
<!-- =================================================================== -->
<div style="display: flex; align-items: flex-start; margin-top: 3em; margin-bottom: 2em; padding: 0 1em;">

  <!-- 左侧头像部分 -->
  <div style="flex: 0 0 150px; margin-right: 2em;">
    <img src="/assets/images/siyuan-avatar.jpg" alt="思远" style="width: 150px; border-radius: 15px;">
  </div>

  <!-- 右侧文字介绍部分 -->
  <div style="flex: 1;">
    <h2 style="margin-top: 0;">About Me / 关于我</h2>
    <div style="line-height: 1.6;">
      <p>I'm especially interested in artificial intelligence. I want to understand how AI can think, and how it can help people learn better.</p>
      <p><small>我特别对人工智能感兴趣。我想了解 AI 是如何“思考”的，以及它如何帮助人类更好地学习。</small></p>

      <p>In the future, I hope to study neuroscience so I can understand how the brain works, and how that connects to AI.</p>
      <p><small>未来我希望学习一些脑神经科学的知识，以更好地理解大脑的工作方式，并将其与 AI 联系起来。</small></p>

      <p>This blog is where I write down my thoughts, learning notes, and quotes from books.</p>
      <p><small>这个博客是我用来记录思考、学习笔记和读书摘录的地方。</small></p>
      
      <!-- 如果你想展示所有文字，可以取消下面的注释 -->
      <!--
      <p>I hope my writing can inspire others, and help us think more deeply together.</p>
      <p><small>我希望我的写作可以启发他人，也帮助我们一起更深入地思考。</small></p>

      <p>Thank you for visiting! Feel free to contact me if you'd like to talk.</p>
      <p><small>感谢你的来访！如果你愿意交流，欢迎随时联系我。</small></p>
      -->
    </div>
    <p style="margin-top: 2em;">
      <a href="https://github.com/synr1xhone" class="btn btn--inverse">GitHub</a>
      <a href="mailto:sikyuan@outlook.com" class="btn btn--inverse">Email</a>
    </p>
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
