---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: splash
title: "Hi there👋, I am George!"
author_profile: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/splash-img.jpg
  actions:
    - label: "View Blog"
      url: "/blog/"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com/photos/a-group-of-trees-covered-in-snow-on-a-cloudy-day-ur3pxr-6CmA)"
excerpt: "<h2 id=\"header\">I am a <span class=\"typewrite\" data-period=\"1000\" data-type='[ \"Student\", \"Programmer\", \"Maker\", \"Adventurer\" ]'><span class=\"wrap\"></span></span>.</h2>"
feature_row:
  - image_path: https://i.ibb.co/ZKh3sSf/jellyfin-home.png
    alt: "Jellyfin Home Page"
    title: "JellyRec - A Jellyfin Movie/Show Recommender"
    excerpt: "A movie recommendation system based on past viewing activities."
    url: "/blog/jellyrec"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/11/trusted-reviews-hp-envy-x360-15-open.jpg
    alt: "HP ENVY x360 15-es1035nr"
    title: "GServe: My Personal Server"
    excerpt: "An HP Envy X360 Laptop running a suite of services on Docker."
    url: "/blog/gserve"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: https://i.ibb.co/wB14JsQ/pc-cover.png
    alt: "Poll Creator Frontend Screenshot"
    title: "Poll Creator Pro Max Ultra"
    excerpt: "A web application that allows users to create and share polls with their friends."
    url: "/projects/poll-creator"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include typewriter.html %}

# About Me
<hr>

<figure style="width: 300px; height: auto;" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/skiing_profile.jpg" alt="">
  <figcaption>Photo taken in 2019.</figcaption>
</figure> 

Welcome! I am a student at the [University of Massachusetts Amherst](https://www.umass.edu/) pursuing a Master's Degree in Computer Science from the [Manning College of Information and Computer Sciences](https://www.cics.umass.edu/). My interests include machine learning, networking, cybersecurity, and software engineering. I received my Bachelor's Degree in Computer Science from [UMass Amherst](https://www.umass.edu/) in 2024, where I also worked as an undergraduate course assistant (UCA) for [CICS 256: Make: A Hands-on Introduction to Physical Computing](https://sites.google.com/view/cics256/home) as well as [CS377: Operating Systems](https://github.com/umass-cs-377/377-F22).

In my free time, I like to workout, cook, or binge-watch TV shows (currently watching [Attack on Titan](https://en.wikipedia.org/wiki/Attack_on_Titan)). I also enjoy working on random projects, such as hosting a home-server on a laptop ([more info here](/blog/gserve/)) and creating a movie recommendation system for [Jellyfin](https://jellyfin.org/) ([more info here](/blog/jellyrec/)).

Checkout my [resume](/assets/files/resume.pdf) for more information about me.

<!-- To ensure the figure doesn't float to the left of the next part -->
<div style="clear: both;"></div>

# My Links
<hr>

{% include social-links.html %}

# Featured Projects
<hr>

{% include feature_row %}
