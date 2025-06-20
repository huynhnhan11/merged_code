from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get('/')
def root():
    print("Hello from backend!")
    return {"message": "Hello from backend!"}


