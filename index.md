---
layout: splash
permalink: /
hidden: true
header:
  overlay_image: /assets/images/home-bg.jpg
  overlay_filter: 0.5 # (0.0 - 1.0)
  caption: "图片来源: [Unsplash](https://unsplash.com)"
  actions:
    - label: "<i class='fas fa-fw fa-book-reader'></i> 查看博客"
      url: "/year-archive/"
title: "你好，我是思远"
excerpt: >
  我是一名 <span id="typed-text"></span><br />
  热爱探索科技与人文的交汇点。
feature_row:
  - image_path: /assets/images/siyuan-avatar.jpg
    alt: "思远"
    title: "关于我"
    excerpt: "我正在努力学习数理与编程，希望未来能在人工智能或工程技术领域做出自己的贡献。在这个博客里，我将分享我的学习笔记、思考随便，以及在日常生活中对世界的观察。"
    url: "/about/"
    btn_label: "了解更多"
    btn_class: "btn--inverse"
---

<!-- =================================================================== -->
<!--      下面的代码是实现打字机效果的“魔法”，请不要修改它们            -->
<!-- =================================================================== -->

<!-- 第一步：引入 Typed.js 库 -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

<!-- 第二步：配置并启动打字机效果 -->
<script>
  var typed = new Typed('#typed-text', {
    // 在这里自定义你想要循环出现的词语
    strings: [
      "高中生",
      "探索者",
      "学习者",
      "思考者",
      "未来的工程师"
    ],
    typeSpeed: 80,   // 打字速度 (毫秒)
    backSpeed: 50,   // 删除速度 (毫秒)
    loop: true,      // 是否循环
    showCursor: true, // 是否显示光标
    cursorChar: ' |'   // 光标的样式
  });
</script>
