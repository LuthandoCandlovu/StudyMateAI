from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudyData(BaseModel):
    daily_hours: List[float]
    target_hours: float

class PredictionResponse(BaseModel):
    predicted_performance: float
    advice: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: StudyData):
    avg_hours = np.mean(data.daily_hours) if data.daily_hours else 0
    performance = min(100, max(0, 50 + (avg_hours - data.target_hours) * 10))
    if performance < 30:
        advice = "⚠️ You're falling behind. Increase study time!"
    elif performance < 60:
        advice = "📈 Good start, but aim higher!"
    else:
        advice = "🌟 Excellent! Keep up the great work!"
    return PredictionResponse(predicted_performance=performance, advice=advice)

@app.get("/")
def root():
    return {"message": "AI Study Assistant API is running"}
