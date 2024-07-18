FROM python:3.12.4-bookworm

COPY ./app /app

COPY ./requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]