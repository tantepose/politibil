## Treehouse Full Stack JavaScript Techdegree Capstone Project:
# 🚓 politibil.no 🚓
## by Ole Petter Baugerød Stokke

### This is my submission for the capstone project in my full stack JavaScript Techdegree capstone project; "build your own web application". 

### My project, politibil.no (Norwegian for "police car"), is a Norwegian moile first site, that aims to make following your local police department easier and more fun. 

# 💡 Why I made it
In Norway, every police district has their own Twitter accounts. When the police scanners went dead a few years back, using Twitter was in part a solution for all journalists who no longer could follow their local police, and part a way of making police work more accessible for the Norwegian public. 

All police districts report local events, big and small, using these Twitter accounts. Problem is; the avarage Norwegian doesn't use Twitter. And even if they do, navigating to the accounts can take precious time when police cars zip by. 

Politibil.no gives you all the latests news from your local district fast, easy, fun and hazzle free on your phone. Plus a little extra.

# 🔨 How I made it

## Backend ⚙️
A NodeJS/Express app does all the heavy lifting:
* All data is managed thru a REST API.
* The tweets are gathered using Twit. Then given a little emoji flair before being returned, by doing a fair bit of .replace() action on common words (such as "police", "car", "woman" etc.). 
* Users may create an account. This is stored in a MongoDB database, using mLab, and can be accessed through simply typing in their username, or by the stored client side cookie. I choose not to use passwords, as the accounts store nothing of interest to others.
* User accounts stores a username, their chosen police district (giving them tweets from the correct Twitter account) and their favorite tweets (which they can store by tapping on them, and view through the frontend).

## Frontend 🖌️
A React app does the job of displaying it all:
* dsa
* asd

## Deployment 🚀
The app is available on it's own .no-domain:
* heroku
* domeneshop
* progressive web app

# 📝 How to clone it
To clone and review this app, you need to:
1. asd
2. asd

# ⛰️ What all the Norwegian means

For this app to make any sense in the real world, I had to make it in Norwegian. But fair not - here's a quick lesson:
* asd: asd
* asd: asd

# 📚 All the rest

Here's the project instructions from Treehouse:

-   #### Set up your JavaScript-powered web app

    -   Build your app using any of the technologies or application frameworks you've learned so far such as React, the MEAN Stack, Express, and Node.js
    -   View a list of app ideas below the project instructions

-   #### Connect to at least two APIs

    -   Display data from at least two other web sites by connecting to their API

-   #### Front end design and layout

    -   Use a responsive front end framework like Bootstrap to style your app
    -   You can add your own custom CSS to give your app a unique look

-   #### Manage your app's data with a database

    -   Use a relational database like MySQL
    -   Or use a document-based data store like MongoDB

-   #### Check for issues with your JavaScript code using JSHint, linked in the project resources

    -   JSHint may show you some warnings, so make sure to check through those for any potential problems
    -   You do not need to fix every warning listed but reviewing them can be useful

-   #### Put your project in a new GitHub repository on your GitHub account

    -   See the workshop on Using GitHub for the Degree Program

-   #### App portability

    -   Your app should run successfully after running `npm install` and `npm start` in a local clone of the GitHub repository

-   #### Deploy your project

    -   Make your application available at a public URL, and submit the URL for review