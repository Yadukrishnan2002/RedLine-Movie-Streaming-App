
![Logo](https://drive.google.com/uc?export=view&id=1aZVi3uXkt8FAHmTs_6My9mnrjPSjTN4r)


# REDLINE

REDLINE is a movie streaming App which has an inbuilt movie recommendation system in it. 
This app also has the feature of Group watch where multiple users can watch a common movie togethor
, chat and share their thoughts as well.\
The Recommendation system was made with the help of Machine Learning in Python, and with the help 
of FastAPI framwork, it was locally hosted, So that the app could send request and get 
response from the API \
Firebase firestore database was used as the backend for storing all the details. 




## Tech Stack

**Client:** React Native

**Server:** Python, FastAPI, Firebase


## Features

- Movie Recommendation
- Top Trending Movies
- Group Watch
- Search functionality
- Watch List
- User Ratings
- Authentication
- Cross platform



## Run Locally

Clone the project

```bash
  git clone https://github.com/Yadukrishnan2002/RedLine-Movie-Streaming-App.git
```

Go to the API directory

```bash
  cd Recommender API
```

Install respective dependencies which was mentioned under requirements.txt ( requirements.txt is present inside Redline directory)  


Start the API

```bash
  uvicorn main:app
```

Go to the Redline directory

```bash
  cd Redline
```

Install respective dependencies which was mentioned under requirements.txt ( requirements.txt is present inside Redline directory)  


Start Expo

```bash
  expo start
```

run on ios simulator 

```bash
  i
```

run on android simulator 

```bash
  a
```

Now the APP will be up and running
## Demonstration

Lets me just walkthrough the APP to give a better idea on it

1. Login Screen 

<p align = "center">
<img src="https://drive.google.com/uc?export=view&id=105HcCT4Gq-Sqa18PqPw2w2FtPHAOvFiY" width = 250 height = 500 align = "center">
</p>

2. Sign Up Screen
  
  <p align = "center">
   <img src="/Gif/Screen_Recording_2022-05-30_at_5_00_38_PM_AdobeCreativeCloudExpress.gif" width = 250 height = 500 >
  </p>
  
  
  Here I have given some basic details and creating a new account 
  
  <p align = "center">
  <img src = "https://drive.google.com/uc?export=view&id=1FhExg9qCL02GEfzJQukrBX02H-swOCXN" width = 250 height = 500 >
  </p>
  
  
  After Signing up, will take the user to Home screen
  
  <p align = "center">
  <img src = "https://drive.google.com/uc?export=view&id=1t4Vi8lfUgTIt7vIIkMKmne8Tvk3gFj3z" width = 250 height = 500 >
  </p>

3. Home Screen

  Here currently in the Home Screen, there are two sections <br />
  
  <B> TOP 10 Trending </B>
  
   Top 10 Trendning section shows the most watched movie in a week and is arranged in the descending order. Here in this situation, Spider-Man No way home has highest view count in this particular week. That is why it's in the top position and is also in the cover page of the Redline App. 
  
  <I> Note: View count is calculated based on the Total view count of a particular movie by distinctive users. If a single user watches a particular movie for more than one time, only the inital count will taken for the evaluation.  </I>
  
  <B> Superhero Movies </B>
  
  The movies with the tag "superhero" will be filtered out directly from the firestore database and is being displayed under the tag Superhero Movies
    
 
  
  
  
  <p align = "center">
  <img src = "/Gif/Screen_Recording_2022-05-31_at_12_12_31_AM_AdobeCreativeCloudExpress.gif"  width = 250 height = 500>
  </p>
  
  
 <B> Currently Recommended movies section is not displayed in the Home page. That is because, since the current user is a new user to the Redline app and the user haven't yet watched any movies from the app. So only after watching a movie, the recommendations will be made to the user </B>

4. Viewing a Movie

  <p align = "center">
  <img src = "https://drive.google.com/uc?export=view&id=1qUcahxj22mxfTSaTsVr1p-J_gmYeRLBs" width = 250 height = 500 >
  </p>

  

   a. Playing a Movie
    
   <p align = "center">
   <img src = "https://drive.google.com/uc?export=view&id=1MU5phNKckowyn3269bZqX7CDbt6m5oAV" width = 250 height = 500 >
    </p>

   b. Watchlist Button
   
   <p align = "center">
   <img src = "https://drive.google.com/uc?export=view&id=1QmzL7d9xCs2HXJQyIthwMeCSSth0a-sL" width = 250 height = 500 >
    </p>

   c. Similar Movies
   
   Based on the genre of the current movie, similar movies will be shown to the user
   
   <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_15_06_PM_AdobeCreativeCloudExpress.gif"  width = 250 height = 500>
    </p>

   d. Rating a Movie
   
   After watching a movie, user can provide his/her personal ratings to that movie, based on which the recommendations will be made to the user. 
   
  
   
   <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_15_59_PM_AdobeCreativeCloudExpress.gif"  width = 250 height = 500>
    </p>

 <I> NOTE: If a user watches a movie and forgets to provide rating to that movie, then a nuetral rating score will be automatically taken by the app to provide nuetral recommendations to the user <I/>
   
5. Searching for a Movie
  
  The user can search for a movie he/she wishes to watch. The search algorithm is so efficient that the user does not have to provide the entire name of the movie, just the name snippet is quite enough for providing the results for the searched movie.

 <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_7_52_31_PM_AdobeCreativeCloudExpress_AdobeCreativeCloudExpress.gif"  width = 250 height = 500>
    </p>
 

6. Recommended Movies
  
  To show how recommendations work, the user should watch and rate some movies. So in this case the user has watched the below mentioned movies and provided the respective ratings to it
  
  <I> Note: Considering the user is an action movie lover </I>
  
  Spider-Man No Way Home -- 4/5 (Action/Superhero)
  Avengers: End Game     -- 4/5 (Action/Superhero)
  John Wick 3            -- 4/5 (Action)
  Me before you          -- 1/5 (Romance)
  
  <I>Backend: Movie names along with ratings will be provided to ML model and the model will then rank the movies and give back the result in ascending order(w.r.t rank) to the app</I>
  
  So based on the above ratings the below shown are the recommended movies for this particular user. 

<p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_20_41_PM_AdobeCreativeCloudExpress.gif"   width = 250 height = 500>
    </p>
  
  Since the user has provided good ratings to action/superhero movies and has provided low rating to a romantic movie, More number of Action/Superhero movies were recommended to the user along with some animation movies that includes action in it. 
  

7. Adding Movies to Watchlist

<p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_23_40_PM_AdobeCreativeCloudExpress_AdobeCreativeCloudExpress.gif"  width = 250 height = 500>
    </p>

8. Watchlist Screen

<p align = "center">
   <img src = "https://drive.google.com/uc?export=view&id=1Yjj-BawZnj0BOoIXFylAOgfIfaoqOCkC" width = 250 height = 500 >
    </p>

9. Removing Movie from Watchlist

<p align = "center">
   <img src = "https://drive.google.com/uc?export=view&id=1li8q-gb95BaY4YKZeBDGla_sVaQHgfXw" width = 250 height = 500 >
    </p>

10. Group Watch
  
  This is really a cool feature where you can watch a movie with your friends or family members togethor even if they are staying far from you. By using this feature you can watch a common movie with your loved ones at the same time in multiple devices and can chat and share thoughts and feelings while watching the movie.

  
  
  First of all the user have to select a particular movie, In this case we are choosing Spider-Man No Way Home
  
<p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_31_34_PM_AdobeCreativeCloudExpress.gif"  >
    </p>
    
  
  After selecting the group watch option, a room key will be displayed in every devices. Anyone of the user can create a room with the room key that is displayed in his/her screen. After creating the room then the user can send the same room key to other users for them to enter the same and join.
    
   <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_32_30_PM_AdobeCreativeCloudExpress.gif"   >
    </p>
    
   a. Group Chat functionality 
  
  Here the user can chat with other users who have joined the same room 
   
   <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-31_at_12_15_14_AM_AdobeCreativeCloudExpress.gif"  >
    </p>

   b. Group Play functionality
  
  The play button in group watch is linked to all devices. So if one person plays the movie it will be played in every device which has joined the same room. Same logic goes for pause button as well. 
   
   <p align = "center">
   <img src = "/Gif/Screen_Recording_2022-05-30_at_5_36_41_PM_AdobeCreativeCloudExpress.gif" >
    </p>

11. Profile Screen
  
  Here the user's basic detail will be displayed and if needed the user can log out as well.

<p align = "center">
   <img src = "/Gif/1.gif"  width = 250 height = 500 >
    </p>

12. Logging Out

<p align = "center">
   <img src = "/Gif/2.gif"  width = 250 height = 500>
    </p>


## Contact

Yadu Krishnan U

Email: yadus2002@gmail.com



## Acknowledgements

 - [React Naitive Docs](https://reactnative.dev/docs/accessibilityinfo)
 - [React Naitive tutorial](https://youtu.be/0-S5a0eXPoc)
 - [FastAPI Docs](https://fastapi.tiangolo.com/)
 - [FastAPI tutorial](https://youtu.be/GN6ICac3OXY)
 - [Firebase](https://firebase.google.com/docs?gclid=Cj0KCQjw1tGUBhDXARIsAIJx01lu6eYOinaQlXOTCGih6EIUOUAtBW7a97wqLxEp_qcMyXzhvYNgDsgaAl1jEALw_wcB&gclsrc=aw.ds)


