---
title: 'Creating a blog using Jekyll, Github Pages, and AcademicPages'
date: 2023-12-18
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - blog
tags:
  - Jekyll
  - Github Pages
  - AcademicPages
  - WebDev
---

Why did I choose Jekyll?
======
I have seen a couple good Jekyll personal websites and blogs, and I like the simplicity and elegance of the design. I also like how there are templates that I can use to get started quickly. I also like how I can write my posts in Markdown, which is a lot easier than writing HTML.

How did I choose a template?
======
I looked up "Jekyll personal website" on YouTube and I found a video by [Boris Meinardus](https://youtu.be/8lJhXJCUYCc?si=DNQsgkaAubHTy36q), who used the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) template. I fell in love with the design and decided to use it for my website.

How did I set up my website?
======
I followed the instructions on the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) GitHub page. I forked the repository, renamed it to `zzuo123.github.io`, and enabled GitHub Pages. I then followed the instructions to customize my website. I also followed the instructions to set up a blog.

![front page](https://i.ibb.co/gvqyxhY/20231218-post1-img1.png)

How did I write my first blog post?
======
I followed the instructions on the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) GitHub page. I created a new file in the `_posts` folder and named it `2023-12-18-blog-post1.md`. I then copied the template from the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) GitHub page and edited it to create my first blog post.

Some problems that I have encountered and yet to solve
======
1. ~~I didn't really get local development to work.~~ I tried to follow the instructions on the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) GitHub page, and use the `bundle exec jekyll liveserve` command to run the website locally. However, despite successfully installing all dependencies, Jekyll seem to only recognize the url specified in "_config.yml" but not "_config.dev.yml", causing the website to not render properly. 
  * Update: I got local development to work by running `bundle exec jekyll s` instead of `bundle exec jekyll liveserve`.
2. There are several subpages that I don't need, such as "Talks" and "Teaching". I tried to delete them, but the website doesn't render properly after I deleted them. 
3. I don't know how to add a favicon to my website. I tried to follow the instructions on the [AcademicPages](https://www.github.com/academicpages/academicpages.github.io) GitHub page, but it didn't work.
4. ~~I am also not sure how to add images to blog posts.~~
  * Update: I figured out how to add images to blog posts. I just need to put the image in the "images/blog_images" folder and use the following code to add the image to the blog post: `![image description](/images/blog_images/image_name.png)`
5. I am not sure how to add a table of contents to blog posts.