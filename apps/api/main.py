from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

# Create the FastAPI app instance
app = FastAPI(
    title="OMNI - Autonomous SaaS OS API",
    description="The core API for the OMNI AI-Native Operating System.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SaaSRequest(BaseModel):
    idea: str
    target_audience: str
    monetization: str
    stack_preference: str = "Next.js + FastAPI"

class GenerationResponse(BaseModel):
    project_id: str
    status: str
    message: str

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "omni-api"}

@app.post("/api/v1/generate", response_model=GenerationResponse)
async def generate_saas(request: SaaSRequest):
    """
    Trigger the LangGraph autonomous generation pipeline.
    """
    # Here we would normally kick off an async worker or Celery task
    # For now, we simulate an accepted background job.
    
    project_id = "omni-proj-" + request.idea[:10].replace(" ", "-").lower()
    
    # Simulate async handoff
    return GenerationResponse(
        project_id=project_id,
        status="processing",
        message="SaaS architecture generation initiated. Agents are analyzing the request."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
