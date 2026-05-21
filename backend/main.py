from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
CSV_FILE = BASE_DIR / "leads.csv"


class FilterRequest(BaseModel):
    city: str | None = None
    state: str | None = None
    industry: str | None = None


@app.get("/")
def home():
    return {"message": "LeadFinder Backend is running"}


@app.get("/leads")
def get_leads():
    df = pd.read_csv(CSV_FILE)
    return df.to_dict(orient="records")


@app.post("/filter-leads")
def filter_leads(filters: FilterRequest):
    df = pd.read_csv(CSV_FILE)

    if filters.city:
        df = df[df["city"].str.lower() == filters.city.lower()]

    if filters.state:
        df = df[df["state"].str.lower() == filters.state.lower()]

    if filters.industry:
        df = df[df["industry"].str.lower() == filters.industry.lower()]

    return df.to_dict(orient="records")


@app.get("/stats")
def get_stats():
    df = pd.read_csv(CSV_FILE)

    total_leads = len(df)
    average_employees = np.mean(df["employee_size"])

    return {
        "total_leads": total_leads,
        "average_employees": round(float(average_employees), 2)
    }