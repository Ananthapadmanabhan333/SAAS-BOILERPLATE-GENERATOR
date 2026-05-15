# OMNI: Autonomous SaaS Operating System

OMNI is an enterprise-grade, autonomous AI platform designed to transform startup ideas and product requirements into production-ready, highly scalable, cloud-native SaaS applications. 

This repository contains the monorepo for the OMNI Generator:
- `apps/web`: The Next.js 15 frontend featuring a cinematic command center.
- `apps/api`: The FastAPI and LangGraph backend orchestrating the AI code generation agents.
- `packages/`: Shared packages for UI, Database (Prisma/SQLAlchemy), and Configuration.

## Architecture
See `ARCHITECTURE_BLUEPRINT.md` for an in-depth breakdown of the multi-agent AI pipeline, cloud infrastructure strategy, authentication logic, and deployment automation.

## Quickstart

### Frontend (Next.js)
```bash
cd apps/web
npm install
npm run dev
```
Runs locally on `http://localhost:3000`.

### Backend (FastAPI + LangGraph)
```bash
cd apps/api
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
API runs locally on `http://localhost:8000`.

## Features
- **Cinematic UI**: Premium dashboard designed with Framer Motion, Tailwind CSS, and shadcn/ui.
- **LangGraph Agents**: Recursive orchestration layer to plan, design, and code full-stack applications.
- **Multi-Tenant Ready**: Scaffolds scalable microservice patterns out-of-the-box.
