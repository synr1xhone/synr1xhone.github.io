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

# ===================================================================
#      全新的、居中对齐的“关于我”介绍模块 (feature_row)          
# ===================================================================
feature_row:
  - image_path: /assets/images/siyuan-avatar.jpg
    alt: "思远"
    title: "About Me / 关于我"
    excerpt: "我特别对人工智能感兴趣。我想了解 AI 是如何“思考”的，以及它如何帮助人类更好地学习。未来我希望学习一些脑神经科学的知识，以更好地理解大脑的工作方式，并将其与 AI 联系起来。<br><br>这个博客是我用来记录思考、学习笔记和读书摘录的地方。我希望我的写作可以启发他人，也帮助我们一起更深入地思考。<br><br>感谢你的来访！如果你愿意交流，欢迎随时联系我。"
    url: "mailto:sikyuan@outlook.com"
    btn_label: "Email Me"
    btn_class: "btn--inverse"
---

<!-- =================================================================== -->
<!--      打字机效果的“魔法”脚本                                     -->
<!-- =================================================================== -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
<script>
  var typed = new Typed('#typed-text', {
    strings: [
      "我是一名高中生。",
      "我是一名探索者。",
      "我是一名学习者。",
      "我是一名思考家。",
      "我是一名未来的工程师。"
    ],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: ' |'
  });
</script>
