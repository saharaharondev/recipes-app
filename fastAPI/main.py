from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
# from supabase.env import supabase_url,supabase_anon_key
load_dotenv()

app = FastAPI()
origins = [
    "http://localhost",  # Allow local development
    "http://127.0.0.1",
    "http://localhost:19000"  # Replace with your actual app URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase_url = os.getenv("SUPABASE_URL")
supabase_anon_key = os.getenv("SUPABASE_ANON_KEY")
# print(supabase_url,supabase_anon_key)
# supabase_url = "<your supabase url>"
# supabase_anon_key = "<your supabase key>"
supabase: Client = create_client(supabase_url, supabase_anon_key)

@app.get("/recipes/")
def read_recipes():
    response = supabase.table('recipes').select('*').execute()
    return {"recipes": response.data}

@app.post("/recipes/")
def create_recipe(name: str, ingredients: str):
    response = supabase.table('recipes').insert({"name": name, "ingredients": ingredients}).execute()
    return {"message": "Recipe created successfully", "data": response.data}


class Ingredient(BaseModel):
    name: str
    amount: float
    unit: str


class Recipe(BaseModel):
    title: str
    image: str
    summary: str
    ingredients: list[Ingredient]
    instructions: str
    servings: int


@app.post("/save-recipe")
async def save_recipe(recipe: Recipe):
    try:
        # Convert the ingredients to the format Supabase expects
        ingredients = [
            {"name": ing.name, "amount": ing.amount, "unit": ing.unit}
            for ing in recipe.ingredients
        ]

        data = {
            "title": recipe.title,
            "image": recipe.image,
            "summary": recipe.summary,
            "ingredients": ingredients,
            "instructions": recipe.instructions,
            "servings": recipe.servings
        }

        # Insert the data into Supabase
        response = supabase.from_("recipes").insert([data]).execute()

        # Check for an error in the response
        if 'error' in response and response['error']:
            error_message = response['error'].get('message', 'Unknown error occurred')
            raise HTTPException(status_code=500, detail=error_message)

        return {"message": "Recipe saved successfully!"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

