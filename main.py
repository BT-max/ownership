from fastapi import FastAPI

from scrapper import get_ownership

app = FastAPI()


@app.get("/api/ownership")
async def ownership(ticker: str):
    return get_ownership(ticker)
