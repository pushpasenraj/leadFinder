from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://lead-finder-opal.vercel.app",
        "https://pushpakannan-leadfinder-chatbot.hf.space",
        "https://huggingface.co"
    ],
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


def detect_intent(message):
    message = message.lower()

    greeting_keywords = [
        "hello", "hi", "hey", "hai",
        "good morning", "good afternoon",
        "good evening", "good night"
    ]

    service_keywords = [
        "service", "services", "provide", "offer",
        "what do you do"
    ]

    contact_keywords = [
        "contact", "phone", "email", "reach",
        "call", "support"
    ]

    lead_score_keywords = [
        "lead score", "lead scoring", "scoring",
        "priority", "hot lead"
    ]

    smart_search_keywords = [
        "smart search", "nlp", "natural language"
    ]

    lead_search_keywords = [
        "find", "show", "search", "get me",
        "companies in", "businesses in"
    ]

    lead_info_keywords = [
        "what is lead", "what are leads",
        "business lead", "business leads",
        "lead meaning", "about lead"
    ]

    list_keywords = [
        "list", "lists", "email list",
        "marketing list", "business list",
        "lead list"
    ]

    about_keywords = [
        "about", "leadfinder", "who are you"
    ]

    help_keywords = [
        "help", "how to use", "what can you do"
    ]

    if any(word in message for word in greeting_keywords):
        return "greeting"

    if any(word in message for word in lead_search_keywords):
        return "lead_search"

    if any(word in message for word in lead_info_keywords):
        return "lead_info"

    if any(word in message for word in list_keywords):
        return "lists"

    if any(word in message for word in contact_keywords):
        return "contact"

    if any(word in message for word in service_keywords):
        return "services"

    if any(word in message for word in lead_score_keywords):
        return "lead_score"

    if any(word in message for word in smart_search_keywords):
        return "smart_search"

    if any(word in message for word in help_keywords):
        return "help"

    if any(word in message for word in about_keywords):
        return "about"

    return "unknown"

@app.post("/chat")
def chatbot(request: ChatRequest):
    message = request.me
    ssage.lower()
    intent = detect_intent(message)

    if intent == "greeting":
        reply = "Hello! Welcome to LeadFinder. How can I help you?"

    elif intent == "lead_search":
        df = pd.read_csv(CSV_FILE)

        detected_city = None
        detected_state = None
        detected_industry = None

        for city in df["city"].unique():
            if city.lower() in message:
                detected_city = city

        for state in df["state"].unique():
            if state.lower() in message:
                detected_state = state

        for industry in df["industry"].unique():
            if industry.lower() in message:
                detected_industry = industry

        if detected_city:
            df = df[df["city"].str.lower() == detected_city.lower()]

        if detected_state:
            df = df[df["state"].str.lower() == detected_state.lower()]

        if detected_industry:
            df = df[df["industry"].str.lower() == detected_industry.lower()]

        if len(df) == 0:
            reply = "Sorry, I could not find matching leads for your search."
        else:
            reply = f"I found {len(df)} matching lead(s):\n"

            for _, row in df.head(3).iterrows():
                reply += (
                    f"- {row['company_name']} | "
                    f"{row['city']} | "
                    f"{row['industry']} | "
                    f"{row['employee_size']} employees\n"
                )


    elif intent == "contact":
        reply = "You can contact us using the Contact section on this website."

    elif intent == "services":
        reply = "We provide Business Leads, Email Marketing Lists, Industry Targeting, Smart Search, and Lead Scoring."

    elif intent == "lead_score":
        reply = "Lead scoring helps classify prospects as High, Medium, or Low priority."

    elif intent == "smart_search":
        reply = "Smart Search uses NLP keyword matching to understand natural language searches."

    elif intent == "about":
        reply = "LeadFinder is a business lead search platform that helps users find targeted leads."
    
    elif intent == "lead_info":
        reply = "A lead is a potential customer or business contact who may be interested in your product or service."

    elif intent == "lists":
        reply = "LeadFinder provides business lists and email marketing lists to help you reach targeted companies and prospects."

    elif intent == "help":
        reply = "You can ask me about services, business leads, email lists, lead scoring, smart search, contact, or search leads by city and industry."

    else:
        reply = "Sorry, I am still learning. Please ask about services, contact, lead scoring, or search leads."

    return {
        "user_message": request.message,
        "intent": intent,
        "bot_reply": reply
    }