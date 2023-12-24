---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: splash
title: "George's Blog"
author_profile: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/splash-img.jpg
  actions:
    - label: "Learn more"
      url: "/#about-me"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com/photos/a-group-of-trees-covered-in-snow-on-a-cloudy-day-ur3pxr-6CmA)"
excerpt: "<h2 id=\"header\">I am a <span class=\"typewrite\" data-period=\"1000\" data-type='[ \"Student\", \"Programmer\", \"Maker\", \"Adventurer\" ]'><span class=\"wrap\"></span></span>.</h2>"
---

{% include typewriter.html %}

# About Me

<figure style="width: 300px; height: auto;" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/skiing_profile.jpg" alt="">
  <figcaption>Photo taken in 2019.</figcaption>
</figure> 

Welcome! I am an undergraduate student at the [University of Massachusetts Amherst](https://www.umass.edu/) studying Computer Science and Mathematics. I am currently at my fourth year of undergraduate studies at the [Manning College of Information and Computer Sciences](https://www.cics.umass.edu/), after which I plan to pursue a Master's degree in Computer Science. My interests include machine learning, cybersecurity, and software engineering. I am currently working as an undergraduate course assistant (UCA) for [CICS 256: Make: A Hands-on Introduction to Physical Computing](https://sites.google.com/view/cics256/home).

In my free time, I like to workout, cook, or binge-watch TV shows (currently watching [Attack on Titan](https://en.wikipedia.org/wiki/Attack_on_Titan)). I also enjoy working on random projects, such as hosting a JellyFin Server on my Raspberry Pi, or building this website using Jekyll and GitHub Pages.

Checkout my [resume](/assets/files/resume.pdf) for more information about me.

<!-- To ensure the figure doesn't float to the left of the next part -->
<div style="clear: both;"></div>

# My Links

{% include social-links.html %}