## Treehouse Full Stack JavaScript Techdegree Capstone Project:
# 🚓 politibil.no 🚓
## by Ole Petter Baugerød Stokke

This is my submission for the capstone project in my full stack JavaScript Techdegree capstone project; "build your own web application". 

My project, politibil.no (Norwegian for "police car"), is a Norwegian moile first site, that aims to make following your local police department easier and more fun. 

# 💡 Why I made it
In Norway, every police district has their own Twitter accounts. When the police scanners went dead a few years back, using Twitter was in part a solution for all journalists who no longer could follow their local police, and part a way of making police work more accessible for the Norwegian public. 

All police districts report local events, big and small, using these Twitter accounts. Problem is; the avarage Norwegian doesn't use Twitter. And even if they do, navigating to the accounts can take precious time when police cars zip by. 

Politibil.no gives you all the latests news from your local district fast, easy, fun and hazzle free on your phone. Plus a little extra.

# 🔨 How I made it

Politibil.no takes a police district Twitter handle, and outputs the tweets with a twist. It also gives users a way of quickly getting tweets from their local police district, and saving their favorites. 

## Backend ⚙️
A NodeJS/Express app does all the heavy lifting:
* All data is managed thru a REST API.
* The tweets are processed using Twit. Then given a little emoji flair before being returned, by doing a fair bit of .replace() action on common words (such as "police", "car", "woman" etc.). 
* Users may create an account, where a username, their selected police district and favorite tweets are stored in a mLab MongoDB database. 
* I choose not to use authentication or passwords, as the accounts store nothing of interest to others. And everyone hates passwords, anyway.
* All credentials (Twitter and mLab API keys) are stored using the dotenv module.

## Frontend 🖌️
A React app gets the fun job of displaying it all:
* Users get a greeting from Giphy - mainly because Treehouse asked me to use at least two APIs, to be honest. 
* If the user has a local cookie stored, and a user account, they are automaticly logged in. This brings tweets from their chosen police district, and loads their favorite tweets. If they have allready used politibil.no and therefore has a coockie, but no user account, the last district they chose will be loaded. 
* Tweets are gathered through my own API, and displayed using my custom styled React components. 
* At the bottom of the screen there's a menu, giving users the ability to, amongst other things, log in, browse their favorite tweets and most importantly - display even more tweets (pagination). It's designed to appear as a chat between my app and it's users. 
* Users may at any point change their district, by choosing a district among all Norwegian police districts. This will be saved in their user account. 
* Clicking a tweet while logged in will save this tweet as a favorite in their user account.

## Deployment 🚀
Politibil.no is, as it's name implies, available on it's own .no-domain:
* Heroku hosts the backend and frontend, mirroring this Github repo. Credentials are given through Herokus config vars.
* The domain is managed through the Norwegian hosting service Domeneshop. 
* As this is a mobile first app, I have enabled Progressive Web App (PWA) behavior. Mainly the ability to make a shortcut with a custom icon, opening the app "as an app" (no visible browser).

# 📝 How to clone it
To clone and review this app, you need to:
1. Clone the repo https://github.com/tantepose/politibil.git.
2. Install all dependencies in both root and /client folders.
3. Create a mLab database at mlab.com, with a collection called "users".
4. Create a Twitter app on developer.twitter.com.
5. Rename example.env to .env, and provide the required credentials from step #3 and #4 (consumer_key, consumer_secret, access_token and access_token_secret from the Twitter API, and mlab_uri from the mLab database).
6. Run the app using `npm start` from root.

# ⛰️ What all the Norwegian means

For this app to make any sense in the real world, it's all in Norwegian. But fear not - here's a quick lesson on common phrases used, as they appear in the app:
* Intro:
    * *politibil*: police car
    * *politiradio på nett*: online police radio
    * *vis meg @(police district Twitter handle) 😺*: show me @()
    * *Skal bli! 👮*: Will do!
* Menu:
    * *Gi meg mer! 😽*: Give me more!
    * *La meg logge på! 😻*: Let me log in!
    * *Bytt politidistrikt! 😼*: Change police district!
    * *La meg lage en bruker! 😹*: Let me make a user!
    * *Hva er dette? 🐱*: What is this?
* Menu when logged in:
    * *Vis mine favoritter! 😻*: Show me my favorites!
    * *Logg meg av! 🙀*: Log me off!

# 📚 What Treehouse asked for

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