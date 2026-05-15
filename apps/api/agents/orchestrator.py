from typing import Dict, TypedDict, Any
from langgraph.graph import StateGraph, END
import time

class AgentState(TypedDict):
    idea: str
    target_audience: str
    architecture: Dict[str, Any]
    code_files: Dict[str, str]
    status: str

def architect_node(state: AgentState):
    """
    Analyzes the idea and designs the software architecture.
    """
    print("--- ARCHITECT AGENT ---")
    idea = state["idea"]
    
    # Simulated AI logic
    architecture = {
        "frontend": "Next.js 15, Tailwind, React Query",
        "backend": "FastAPI, PostgreSQL, Redis",
        "auth": "Clerk",
        "billing": "Stripe"
    }
    
    return {"architecture": architecture, "status": "architected"}

def developer_node(state: AgentState):
    """
    Writes the code based on the architecture.
    """
    print("--- DEVELOPER AGENT ---")
    
    # Simulated code generation
    code_files = {
        "frontend/page.tsx": "export default function Home() { return <div>SaaS App</div> }",
        "backend/main.py": "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\ndef read_root(): return {'hello': 'world'}"
    }
    
    return {"code_files": code_files, "status": "coded"}

def devops_node(state: AgentState):
    """
    Generates deployment files.
    """
    print("--- DEVOPS AGENT ---")
    
    # Simulated DevOps config generation
    state["code_files"]["Dockerfile"] = "FROM python:3.11\nCMD ['uvicorn', 'main:app']"
    
    return {"code_files": state["code_files"], "status": "deployed"}

# Define the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("architect", architect_node)
workflow.add_node("developer", developer_node)
workflow.add_node("devops", devops_node)

# Add edges
workflow.set_entry_point("architect")
workflow.add_edge("architect", "developer")
workflow.add_edge("developer", "devops")
workflow.add_edge("devops", END)

# Compile graph
omni_agent_pipeline = workflow.compile()

if __name__ == "__main__":
    # Test execution
    initial_state = {
        "idea": "An AI CRM for real estate agents.",
        "target_audience": "Real Estate Agents",
        "architecture": {},
        "code_files": {},
        "status": "started"
    }
    
    print("Starting OMNI AI Pipeline...")
    result = omni_agent_pipeline.invoke(initial_state)
    print("Pipeline Output Status:", result["status"])
    print("Generated Architecture:", result["architecture"])
