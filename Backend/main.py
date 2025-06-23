from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated in-memory store
users = {
    "demo_user": {
        "xp": 200,
        "projects": [
            {"title": "Build a Recursion Visualizer", "status": "Completed"},
            {"title": "Create a Sorting Algorithm Game", "status": "In Progress"}
        ]
    }
}

class ConceptInput(BaseModel):
    concept: str

@app.post("/generate")
async def generate_project(input: ConceptInput):
    prompt = f"""
    You are an AI project mentor. Given the concept: "{input.concept}", generate 3 personalized project ideas:
    1. Beginner
    2. Intermediate
    3. Advanced
    Include domain (e.g., Web, AI, Hardware) and a one-line roadmap.
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You're a creative AI mentor for students."},
            {"role": "user", "content": prompt}
        ]
    )
    return {"projects": response["choices"][0]["message"]["content"]}

@app.post("/generate-roadmap")
async def generate_roadmap(input: ConceptInput):
    roadmap = {
        "title": f"Roadmap for {input.concept}",
        "steps": [
            {"topic": f"Basics of {input.concept}", "duration": "2 days"},
            {"topic": "Hands-on with examples", "duration": "3 days"},
            {"topic": "Build final project", "duration": "2 days"}
        ]
    }
    return {"roadmap": roadmap}

@app.get("/fetch-dashboard-data")
async def fetch_dashboard():
    user = users.get("demo_user")
    if not user:
        return {"xp": 0, "completed": 0, "projects": []}
    completed = sum(1 for proj in user["projects"] if proj["status"] == "Completed")
    return {
        "xp": user["xp"],
        "completed": completed,
        "projects": user["projects"]
    }
