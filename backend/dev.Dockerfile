FROM python:3.12.4-bookworm

# This nesting within docker file system is necessary to allow watchfiles used by uvicorn to work
COPY ./app /app/app

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 8000

ENV PYTHONPATH ..

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--reload"]