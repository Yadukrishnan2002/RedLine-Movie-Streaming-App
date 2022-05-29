


from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from model import Todo, TrendingMovies

from pydantic import BaseModel

from typing import List

import pandas as pd

import sched, time
# from firebase import firebase,db


# s = sched.scheduler(time.time, time.sleep)
# def do_something(): 
#     print("Doing stuff...")
#     # do your stuff
#     db.collection('users').doc('yadus2002@gmail.com').collection('MoviesWatched').add({'song': 'Imagine', 'artist': 'John Lennon'})
#     s.enter(2, 1, do_something)

# s.enter(2, 1, do_something)
# s.run()



class Item(BaseModel):
    name: int

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['Get','Post'],
    allow_headers = ['Content-Type','application/xml'],
)


# db: List[movies] = [
#     movies(
#         mname = 'Avengers',
#         mrating = 5
#     ),
#     movies(
#         mname = 'John Wick'
#         mrating = 4
#     )
# ]

movie_list = []
rating_list = []
FinalMovies = []


TrendingMovie_list = []
TrendingCount_list = []



@app.post("/api/todo/", response_model = Todo)
async def post_todo(todo: Todo):
    
    movie_list.clear()
    rating_list.clear()
    FinalMovies.clear()
    

    for movie in todo.title:
        if movie not in movie_list:
            movie_list.append(movie)
    
    for rating in todo.description:
        if rating not in rating_list:
            rating_list.append(rating)

    print(movie_list)
    print()

    print("Recommended Movies are: \n")
    # print(rating_list)

    # corrMatrix = pd.read_csv('MyMoviesCorrelationFinal2.csv',index_col = 0)

    ratings = pd.read_csv('MyMoviesDatasetNewEdited.csv')
    userRatings = ratings.pivot_table(index = ['Userid'],columns = ['Title'],values = 'Rating')
    corrMatrix = userRatings.corr(method = 'pearson')

    
    action_lover3 = list(map(list,zip(movie_list,rating_list)))


    similar_movies = pd.DataFrame()

    for movie,rating in action_lover3:
  
        
        similar_ratings = corrMatrix[movie] * (rating - 2.3) #2.27
        similar_ratings = similar_ratings.sort_values(ascending = False)
        # print(similar_ratings)
        similar_movies = similar_movies.append(similar_ratings)

    
    recmovies = similar_movies.sum().sort_values(ascending = False)

    result = recmovies[:20 + len(movie_list)].keys()
    result = result.tolist()
    
    

    for movie in result:
        
        FinalMovies.append(movie)
    
    
    for mov1 in movie_list:
        if mov1 in FinalMovies:
            FinalMovies.remove(mov1)
    

    print(FinalMovies)
    
    

@app.get("/api/data")
async def root():
    
    return (FinalMovies)



# def swapValue(i,j):

#     temp = TrendingCount_list[i]
#     TrendingCount_list[i] = TrendingCount_list[j]
#     TrendingCount_list[j] = temp

#     temp = TrendingMovie_list[i]
#     TrendingMovie_list[i] = TrendingMovie_list[j]
#     TrendingMovie_list[j] = temp



def MergeSort(TrendingCount_list,TrendingMovie_list):
    if(len(TrendingCount_list) > 1):

        r = len(TrendingCount_list)//2
        L = TrendingCount_list[:r]
        M = TrendingCount_list[r:]

        MovieL = TrendingMovie_list[:r]
        MovieM = TrendingMovie_list[r:]

        
        MergeSort(L,MovieL)
        MergeSort(M,MovieM)


        i = j = k = 0

        while i<len(L) and j < len(M):
            if( L[i] > M[j] ):
                TrendingCount_list[k] = L[i]
                TrendingMovie_list[k] = MovieL[i]
                i += 1
            else:
                TrendingCount_list[k] = M[j]
                TrendingMovie_list[k] = MovieM[j]
                j += 1

            k +=1


        while i<len(L):
            TrendingCount_list[k] = L[i]
            TrendingMovie_list[k] = MovieL[i]
            i += 1
            k += 1
        
        while j<len(M):
            TrendingCount_list[k] = M[j]
            TrendingMovie_list[k] = MovieM[j]
            j += 1
            k += 1





@app.post("/api/PostTrending",response_model = TrendingMovies)
async def post_trending(trend: TrendingMovies):

    TrendingMovie_list.clear()
    TrendingCount_list.clear()

    for movie in trend.Mnames:
        TrendingMovie_list.append(movie)
    
    for count in trend.MwatchCounts:
        TrendingCount_list.append(count)
    


    # for i in range((len(TrendingCount_list))-1):
    #     for j in range(i + 1,len(TrendingCount_list)):

    #         if(TrendingCount_list[j] > TrendingCount_list[i]):
    #             swapValue(i,j)
    

    MergeSort(TrendingCount_list,TrendingMovie_list)

    print("\nTrending Movies\n")
    
    print(TrendingMovie_list[:10])



@app.get("/api/GetTrending")
async def get_trending():
    return(TrendingMovie_list[:10])