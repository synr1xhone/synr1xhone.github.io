---
title: 'Starting new project: JellyRec - A Jellyfin Movie/Show Recommender'
date: 2024-7-8
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - blog 
tags:
  - WebDev
  - Docker
  - Express
---

## Project Idea :bulb:

A movie recommendation system based on past viewing activities, similar to Netflix and YouTube. This feature currently doesn’t exist on Jellyfin, and Jellyfin only has access to movies on the user's device, instead of all the film out there. So we can connect the system to IMDB so we can recommend new films that the user can then purchase and rip to their device. 

## Scope :dart:

### JF Plugin vs. Web App

My original idea was to create a Jellyfin Plugin and then directly use the task scheduler feature in Jellyfin. However, writing a Jellyfin Plugin requires using dotnet, which I am not familiar with. So instead I will create a web app that will connect to the Jellyfin server using its API and then recommend movies to the user through a web interface. Another benefit of this approach is that it can show movies that are not on the user's device, but are available on the internet. 

### Recommendation System

As for the recommendation system, that part is still under research and I will get back to the project later. Currently, I am thinking of two approaches:

1. Use a readily available recommendation system library, such as [Surprise](https://surprise.readthedocs.io/en/stable/), and train it on the user's viewing history.

2. Create my own recommendation system using a neural network, and train it on the user's viewing history. However, this approach is more complex and time-consuming, so I am not sure if I will go with this approach. The upside is that I get more experience with neural networks.

{% capture notice %}
#### Model-based filtering (collaborative filtering)
- Recommendation based on other user’s rating
- Jellyfin doesn’t have ratings, but have favorites, so favorites gets 5 (really like), other gets 3 (meh, have not watched yet/don’t really like). No movie assigned 0 since user won’t keep a movie they don’t like
{% endcapture %}

<div class="notice info">{{ notice | markdownify }}</div>

### Training Data

Since my own jellyfin server is only for myself and a few family members, the training data will be limited. So I am thinking of using public datasets like the [MovieLens](https://grouplens.org/datasets/movielens/) dataset to train the recommendation system. 

## Tech Stack :computer:

- **Frontend**: React
- **Backend**: Express
- **Database**: MongoDB
- **Deployment**: Docker

## Resources :books:

[https://youtu.be/3ecNC-So0r4?si=juHM9mMa9Ag1scnc](https://youtu.be/3ecNC-So0r4?si=juHM9mMa9Ag1scnc)

YouTube video with an example using the the MovieLen dataset (instrumental, checkout notebook)

[https://www.kaggle.com/datasets/grouplens/movielens-20m-dataset/data](https://www.kaggle.com/datasets/grouplens/movielens-20m-dataset/data)

Link to MovieLens dataset

[https://www.google.com/search?client=firefox-b-1-d&q=pearson+correlation](https://www.google.com/search?client=firefox-b-1-d&q=pearson+correlation)

Learn about pearson correlation vs. cosine distance

### Alternative Resources

[https://www.freecodecamp.org/news/how-to-build-a-movie-recommendation-system-based-on-collaborative-filtering/](https://www.freecodecamp.org/news/how-to-build-a-movie-recommendation-system-based-on-collaborative-filtering/)

This one uses cosine similarity, is text based

[https://www.turing.com/kb/content-based-filtering-in-recommender-systems#collaborative-filtering](https://www.turing.com/kb/content-based-filtering-in-recommender-systems#collaborative-filtering)

This one explains an alternative approach to collaborative filtering (content-based)

# More to come...