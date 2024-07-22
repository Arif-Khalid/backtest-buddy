# Backtest Buddy

An application that helps you backtest your algorithmic trading strategy

# Setup

1. Clone the repo locally into a directory which will be referred to in further instructions as backtestbuddy/
2. Create a .env file in backtestbuddy/backend/app/ with the keys ALPACA_KEY and ALPACA_SECRET. These can be obtained from creating an account with [Alpaca](https://alpaca.markets)

## With docker (preferred) ✅

2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) if not already on your system
3. Launch Docker Desktop
4. Launch a terminal and navigate inside backtestbuddy/
### With docker compose (preferred) ✅

5. Run `docker-compose -f dev.docker-compose.yml up --watch`
6. Backend is now running on **localhost:8000** and frontend is running on **localhost:5173**, ***WITH HMR***

### Without docker compose

5. Run `docker build -t backtestbuddy-frontend:latest -f frontend/dev.Dockerfile ./frontend`
6. Run `docker build -t backtestbuddy-backend:latest -f backend/dev.Dockerfile ./backend`
7. Run `docker run -p 5173:5173 backtestbuddy-frontend:latest` to start frontend on **localhost:5173** ***WITHOUT HMR***
8. Run `docker run -p 8000:8000 backtestbuddy-backend:latest` to start backend on **localhost:8000** ***WITHOUT HMR***

## Without docker

### Frontend

2. Launch a terminal and navigate to backtestbuddy/frontend
3. Run `npm install`
4. Run `npm run dev` to run frontend on **localhost:5173** ***with HMR***

### Backend

5. Launch a terminal and navigate to backtestbuddy/backend
6. Optionally create and activate a virtual environment, I would recommend using [Anaconda](https://www.anaconda.com/download) to manage virtual environments
   - If using VScode, select the python interpreter by searching for `>Select Python Interpreter` and selecting the virtual environment, then use the in-built VScode terminal for the next instructions
7. Run `pip install -r requirements.txt`
8. Run `uvicorn app.main:app --reload` to run backend on **localhost:8000** ***with HMR***
