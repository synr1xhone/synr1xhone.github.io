---
title: 'Creating a Simple Pong Game with Arduino'
date: 2023-12-30
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - projects
tags:
  - Arduino
  - Embedded Systems
  - C++
  - Game
  - Hardware
gallery:
  - url: /assets/images/blog_images/arduino-pong/one.jpg
    image_path: /assets/images/blog_images/arduino-pong/one.jpg
    alt: "Game Start, ball is in the middle"
    title: "Game Start, ball is in the middle"
  - url: /assets/images/blog_images/arduino-pong/two.jpg
    image_path: /assets/images/blog_images/arduino-pong/two.jpg
    alt: "Ball hits the right edge (not the paddle), score for left player"
    title: "Ball hits the right edge (not the paddle), score for left player"
  - url: /assets/images/blog_images/arduino-pong/three.jpg
    image_path: /assets/images/blog_images/arduino-pong/three.jpg
    alt: "Displaying the score"
    title: "Displaying the score"
---
## :smile: Introduction

This project is a simple pong game that is created with Arduino. The hardware consist of an Arduino Nano, an [Adafruit 3.5" 320x480 Color TFT Touchscreen Breakout](https://learn.adafruit.com/adafruit-3-5-color-320x480-tft-touchscreen-breakout), and two potentiometers. The game is controlled by the potentiometers and the score is displayed on the screen. The game is created with C++ and the Arduino IDE. The game is played by two players, each controlling a paddle. The goal is to hit the ball with the paddle and make the ball hit the opponent's wall. The first player to reach 7 points wins the game.

This is a team project that I worked on with [Antonio Ruiz](https://github.com/antonioruiz2606) for the course [CS 335: Inside the Box: How Computers Work](https://people.cs.umass.edu/~weems/homepage/courses/cmpsci-335.html). The project was completed in December 2023.


## :camera_flash: Gallary
{% include gallery caption="The **Life Cycle** of the pong game..." %}

## :hammer_and_wrench: Hardware Setup

The hardware setup is shown in the gallery section. The potentiometers are connected to the analog pins A0 and A1. The TFT screen is connected to the SPI pins of the Arduino Nano. For more information on the TFT screen, please refer to the [Adafruit website](https://learn.adafruit.com/adafruit-3-5-color-320x480-tft-touchscreen-breakout), where they have a detailed tutorial on how to set up the screen to work with the Arduino.

## :computer: Software Setup

Here is the code for the pong game.

<details>
<summary>Click to Expand Code</summary>

{% highlight cpp %}
#include <SPI.h>
#include "Adafruit_GFX.h"
#include "Adafruit_HX8357.h"

// These are 'flexible' lines that can be changed
#define TFT_CS 10
#define TFT_DC 9
#define TFT_RST 8  // RST can be set to -1 if you tie it to Arduino's reset

#define BLACK 0x0000
#define BLUE 0x001F
#define RED 0xF800
#define GREEN 0x07E0
#define CYAN 0x07FF
#define MAGENTA 0xF81F
#define YELLOW 0xFFE0
#define WHITE 0xFFFF

// Ball/paddle rendering rate idea comes from this implementation https://www.youtube.com/watch?v=ZRL0GUqebFs&t=1s&ab_channel=educ8s.tv
const unsigned long PADDLE_RATE = 33;
const unsigned long BALL_RATE = 20;

// Use hardware SPI (on Uno, #13, #12, #11) and the above for CS/DC
Adafruit_HX8357 tft = Adafruit_HX8357(TFT_CS, TFT_DC, TFT_RST);

unsigned long ballUpdate;
unsigned long paddleUpdate;

int paddleWidth = 40;
int paddleHeight = 5;
int ballSize = 4;

int pot1 = A0;  //Give a name to the analog 0 pin
int pot2 = A1;  //Give a name to the analog 1 pin
int paddle1;    //Variable to hold analog value
int paddle2;    //Variable to hold analog value

int paddleAx, paddleAy;
int paddleBx, paddleBy;
float ballX, ballY;
float ballSpeedX = 5.0;
float ballSpeedY = 5.0;
int scoreA = 0;
int scoreB = 0;

bool gameEnded = false;

void setup() {
  Serial.begin(9600);
  Serial.println("PONG BEGINS");

  pinMode(pot1, INPUT);  //configured as an input
  pinMode(pot2, INPUT);  //configured as an input

  tft.begin();
  tft.setRotation(0);  // Adjust the screen rotation if necessary
  tft.fillScreen(BLACK);

  paddleAy = tft.height() - 20;
  paddleAx = tft.width() / 2;
  paddleBy = 20;
  paddleBx = tft.width() / 2;

  unsigned long start = millis();
  while (millis() - start < 2000);
  ballUpdate = millis();
  paddleUpdate = ballUpdate;
  ballX = tft.width() / 2;
  ballY = tft.height() / 2;
}

float convertInput(int input) {
  float res = input / 1023.0;
  res *= (tft.width() - paddleWidth);
  res += (paddleWidth / 2);
  return res;
}

void renderScores() {
  tft.setRotation(1);
  tft.setCursor((tft.width() / 2) - (tft.width() / 8), tft.height() / 2);
  tft.setTextColor(HX8357_WHITE);
  tft.setTextSize(3);
  tft.print(scoreB);
  tft.print(":");
  tft.print(scoreA);
  tft.fillScreen(HX8357_BLACK);
  tft.setRotation(0);

  if (scoreA < 7 && scoreB < 7) {
    unsigned long start = millis();
    while (millis() - start < 2000);
    ballUpdate = millis();
    paddleUpdate = ballUpdate;
    ballX = tft.width() / 2;
    ballY = tft.height() / 2;
    startGame();
  } else {
    tft.setRotation(1);
    tft.setCursor((tft.width() / 2) - (tft.width() / 4), tft.height() / 2);
    tft.setTextColor(HX8357_WHITE);
    tft.setTextSize(3);
    if (scoreA > scoreB) {
      tft.print("Player B Wins");
    } else {
      tft.print("Player A Wins");
    }
    gameEnded = true;
  }
  return;
}

void startGame() {
  unsigned long time = millis();

  if (time > paddleUpdate) {
    paddle1 = analogRead(pot1);
    paddle2 = analogRead(pot2);
    int newPaddleAx = convertInput(paddle1);
    int newPaddleBx = convertInput(paddle2);
    // Draw stationary paddles
    if (abs(paddleBx - newPaddleBx) < 2) {
      tft.fillRect(paddleBx - paddleWidth / 2, paddleBy - paddleHeight, paddleWidth, paddleHeight, WHITE);
      tft.fillRect(paddleBx - paddleWidth / 2, paddleBy - paddleHeight, paddleWidth, paddleHeight, WHITE);
    } else {
      tft.fillRect(paddleBx - paddleWidth / 2, paddleBy - paddleHeight, paddleWidth, paddleHeight, BLACK);
      tft.fillRect(newPaddleBx - paddleWidth / 2, paddleBy - paddleHeight, paddleWidth, paddleHeight, WHITE);
      paddleBx = newPaddleBx;
    }
    if (abs(paddleAx - newPaddleAx) < 2) {
      tft.fillRect(paddleAx - paddleWidth / 2, paddleAy, paddleWidth, paddleHeight, WHITE);
      tft.fillRect(paddleAx - paddleWidth / 2, paddleAy, paddleWidth, paddleHeight, WHITE);
    } else {
      tft.fillRect(paddleAx - paddleWidth / 2, paddleAy, paddleWidth, paddleHeight, BLACK);
      tft.fillRect(newPaddleAx - paddleWidth / 2, paddleAy, paddleWidth, paddleHeight, WHITE);
      paddleAx = newPaddleAx;
    }
  }

  if (time > ballUpdate) {
    float newX = ballX + ballSpeedX;
    float newY = ballY + ballSpeedY;

    // Ball collisions with walls
    if (newX + ballSize > tft.width() || newX < ballSize) {
      ballSpeedX = -ballSpeedX;
    }
    if (newY > tft.height() - ballSize) {
      scoreB++;
      ballSpeedX = 5.0;
      ballSpeedY = 5.0;
      renderScores();
      return;
    }

    if (newY < ballSize) {
      scoreA++;
      ballSpeedX = 5.0;
      ballSpeedY = 5.0;
      renderScores();
      return;
    }

    // Ball collision with paddleA
    if (newY + ballSize > paddleAy && abs(newX - paddleAx) < paddleWidth) {
      ballSpeedY = -ballSpeedY;
      ballSpeedX *= 1.1;
      ballSpeedY *= 1.1;
    }

    // Ball collision with paddleB
    if (newY + ballSize < paddleBy + paddleHeight && abs(newX - paddleBx) < paddleWidth) {
      ballSpeedY = -ballSpeedY;
      ballSpeedX *= 1.1;
      ballSpeedY *= 1.1;
    }

    tft.fillCircle((int)ballX, (int)ballY, ballSize, BLACK);
    tft.fillCircle((int)newX, (int)newY, ballSize, WHITE);
    ballX = newX;
    ballY = newY;
    ballUpdate += BALL_RATE;
  }
}

void loop() {
  if (!gameEnded) { startGame(); }
}
{% endhighlight %}
</details>

## :keyboard: The Development Process

### First Steps
The first part of the development was outputting from the Arduino Nano to the display. We use the SPI output of the Arduino Nano for this, following the guide on the Adafruit website. Once the wiring was set up, we used the Adafruit_HX8357 library to run some examples and start understanding how the display works.

### The Game Physics
We then started the programming stage, creating the game physics and the skeleton of the game. The first stage was having a ball that bounced around the screen. The game physics is pretty straightforward: we have the ball's speed and constantly update the ball's position by adding the speed to its current position. Here, we ran into the first challenge, rendering speed.

### Rendering Speed (the hard part)
None of the Adafruit_HX8357 examples have active rerendering. I mean that the examples are drawn into the screen, then fully wiped the screen, and then redrawn. The problem is that fully wiping the screen is extremely slow. The initial ball physics were working, but we were limited to rendering a frame every time the screen wiped black, so a frame around every three seconds.

So we could not rely on wiping the whole screen. We initially overcame this issue by masking the ball with a black ball and then re-rendering the white ball in the new location. This is done in the game loop. The issue with this approach is that the ball is updated too much; this slowed down the game since the Arduino Nano was extremely busy rerendering the ball. To fix this, we start a timer using millis() in the game loop and set a BALL_RATE time, which indicates when we will rerender the ball. The Millis re-rendering idea comes from this YouTube implementation: https://www.youtube.com/watch?v=ZRL0GUqebFs&t=1s&ab_channel=educ8s.tv, which is similar to our scenario, but they have a different screen.

Finally, we had fast rendering. We used the hardware SPI tft for CS/DC. tft offered many helper functions to draw circles and rectangles. So all we had to do was keep track of the positions of the ball and paddles and mask and render them when their position changed.
At this stage, we had static paddles just for testing, so we set up two variable resistors as the controllers for the game. The idea is to use these to determine the location of the paddles. To connect them, we use the A0, and A1 PC pins in the arduino nano. We read the input, which ranges from 0 to 1023, normalize it, and multiply it by the display’s width minus the paddle width. This successfully gives us the relative center location of both paddles. Then we do the same mask and rendering operation on the paddle, with PADDLE_RATE, but now we are drawing a rectangle.

### The Game Logic
All that was left was programming the paddle physics, which is only an if statement, where if the ball is in contact with the paddle, the ball’s speed in the Y axis is reversed by negating it. Then we separated the game loop into its own function in order to render scores and render the win state. Drawing text is very simple using the display’s tft object.

### Distribution of Labor
Development took about two days of work, and maybe a little more given the quality of life additions we added such as ball acceleration, win state, etc. We worked together on this project, so we were able to help each other out if we were stuck with a problem. Zhiyang mainly worked on the wiring of the display and potentiometer, finding the library and starter code for this project, and getting the potentiometer input. Antonio mainly worked on the game logic, designing and implementing the physics of the game, as well as rendering the game on the display.

## :thinking: Conclusion

This project taught us about more complex I/O with the Arduino Nano controlling the display. We also applied what we learned in class using the two potentiometers as controls for the game. We learned Arduino programming and used packages to interact with the monitor using SPI. We also experimented with different rendering techniques to be as efficient as possible. We learned that the performance of the Arduino Nano can bottleneck the game’s speed, so if we rerender fewer items on the screen, the speed of the ball increases. This is one of the reasons why some video games experience unusual behavior with lower or higher FPS.
