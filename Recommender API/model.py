from pydantic import BaseModel
from typing import List

class Todo(BaseModel):
    title: List
    description: List

class TrendingMovies(BaseModel):
    Mnames: List
    MwatchCounts: List

class Newvalue(BaseModel):
    newTitle: str


class Info(BaseModel):
    id : int
    name : str

