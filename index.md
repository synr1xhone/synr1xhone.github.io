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
  我是一名 <span id="typed-text"></span><br />
  热爱探索科技与人文的交汇点。
---

<!-- 这是一个分隔符，让主页的结构更清晰 -->
<div class="feature__wrapper">
<div class="feature__item">

<!-- =================================================================== -->
<!--      新增的“关于我”详细介绍部分，直接展示在主页上                -->
<!-- =================================================================== -->

<div class="archive__item">
  <div class="archive__item-teaser">
    <img src="/assets/images/siyuan-avatar.jpg" alt="思远" style="border-radius: 50%;">
  </div>
  <div class="archive__item-body">
    <h2 class="archive__item-title">关于我</h2>
    <div class="archive__item-excerpt">
      <p>我正在努力学习数理与编程，希望未来能在人工智能或工程技术领域做出自己的贡献。</p>
      <p>在这个博客里，我将分享我的学习笔记、思考随笔，以及在日常生活中对世界的观察。希望你能在这里找到共鸣，也欢迎与你交流想法！</p>
      <p>
        <a href="https://github.com/synr1xhone" class="btn btn--inverse">GitHub</a>
        <a href="mailto:sikyuan@outlook.com" class="btn btn--inverse">Email</a>
      </p>
    </div>
  </div>
</div>

</div>
</div>

<!-- =================================================================== -->
<!--      下面的代码是实现打字机效果的“魔法”，请不要修改它们            -->
<!-- =================================================================== -->

<!-- 第一步：引入 Typed.js 库 -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

<!-- 第二步：配置并启动打字机效果 -->
<script>
  var typed = new Typed('#typed-text', {
    strings: [
      "高中生",
      "探索者",
      "学习者",
      "思考家",
      "未来的工程师"
    ],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: ' |'
  });
</script>
