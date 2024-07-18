# Backtest Buddy

An application that helps you backtest your algorithmic trading strategy

# Setup

1. Clone the repo locally into a directory which will be referred to in further instructions as backtestbuddy/

## With docker (preferred)

2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) if not already on your system
3. Launch Docker Desktop
4. Launch a terminal and navigate inside backtestbuddy/

### With docker compose (preferred)

5. Run `docker-compose -f dev.docker-compose.yml watch`
6. Backend is now running on **localhost:8000** and frontend is running on **localhost:5173**, <span style="color: lightgreen">with HMR</span>

### Without docker compose

5. Run `docker build -t backtestbuddy-frontend:latest -f frontend/dev.Dockerfile ./frontend`
6. Run `docker build -t backtestbuddy-backend:latest -f backend/dev.Dockerfile ./backend`
7. Run `docker run -p 5173:5173 backtestbuddy-frontend:latest` to start frontend on **localhost:5173** <span style="color: pink">without HMR</span>
8. Run `docker run -p 8000:8000 backtestbuddy-backend:latest` to start backend on **localhost:8000** <span style="color: pink">without HMR</span>

## Without docker

### Frontend

2. Launch a terminal and navigate to backtestbuddy/frontend
3. Run `npm install`
4. Run `npm run dev` to run frontend on localhost:5173 <span style="color: lightgreen">with HMR</span>

### Backend

5. Launch a terminal and navigate to backtestbuddy/backend
6. Optionally create and activate a virtual environment, I would recommend using [Anaconda](https://www.anaconda.com/download) to manage virtual environments
   - If using VScode, select the python interpreter by searching for `>Select Python Interpreter` and selecting the virtual environment, then use the in-built VScode terminal for the next instructions
7. Run `pip install -r requirements.txt`
8. Run `uvicorn app.main:app --reload` to run backend on localhost:8000 <span style="color: lightgreen">with HMR</span>
