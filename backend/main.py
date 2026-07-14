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

class ChatRequest(BaseModel):
    message: str

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

@app.post("/chat")
def chatbot(request: ChatRequest):
    message = request.message.lower()

    if "hello" in message or "hi" in message or "hey" in message or "hey there" in message or "good morning" in message or "good afternoon" in message or "good evening" in message or "good night" in message or "morning" in message or "afternoon" in message or "evening" in message or "night" in message or "greetings" in message or "greeting" in message or "hi there" in message or "hello there" in message or "hello to you" in message or "hi to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hey there to you" in message or "good morning to you" in message or "good afternoon to you" in message or "good evening to you" in message or "good night to you" in message or "morning to you" in message or "afternoon to you" in message or "evening to you" in message or "night to you" in message or "greetings to you" in message or "greeting to you" in message or "hi to you" in message or "hello to you" in message or "hey to you" in message or "hai" in message:
        reply = "Hello! Welcome to LeadFinder. How can I help you?"

    elif "leadfinder" in message or "about" in message:
        reply = "LeadFinder is a business lead search platform that helps users find targeted leads by city, state, industry, and other filters."

    elif "service" in message or "services" in message:
        reply = "We provide Business Leads, Email Marketing Lists, Industry Targeting, Smart Search, and Lead Scoring."

    elif "business lead" in message or "business leads" in message:
        reply = "Business leads help you find companies that match your target market, location, and industry."

    elif "email" in message or "email list" in message:
        reply = "Our email list feature helps businesses reach targeted prospects for marketing campaigns."

    elif "lead score" in message or "scoring" in message:
        reply = "Lead scoring helps classify prospects as High, Medium, or Low priority based on company data."

    elif "smart search" in message or "nlp" in message:
        reply = "Smart Search uses simple NLP keyword matching to understand natural language searches like 'Find software companies in California'."

    elif "contact" in message:
        reply = "You can contact us using the Contact section on this website."

    elif "help" in message:
        reply = "You can ask me about LeadFinder, services, business leads, email lists, smart search, lead scoring, or contact."

    else:
        reply = "Sorry, I am still learning. Please ask about LeadFinder, services, business leads, email lists, smart search, lead scoring, or contact."

    return {
        "user_message": request.message,
        "bot_reply": reply
    }
