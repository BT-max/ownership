from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scrapper import get_ownership

app = FastAPI()
# This might be better stored in an environment configuration for flexibility between environments.
origins = [
    "http://localhost:5173",
]

# Configure CORS for the origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],  # Limit to only POST since that's what we need.
    allow_headers=["*"]
)


class TickerModel(BaseModel):
    """Request model for the ticker."""
    ticker: str


@app.post("/api/v1/ownership")
async def fetch_ownership(ticker_data: TickerModel):
    """
    Fetch ownership data for the provided ticker.
    """
    try:
        return get_ownership(ticker_data.ticker)
    except Exception as e:
        # You can log the error here
        raise HTTPException(status_code=500, detail="Failed to fetch ownership data.") from e
