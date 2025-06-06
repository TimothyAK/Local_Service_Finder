FROM python:3.12.2-slim-bullseye

ENV PYTHONUNBUFFERED=1
ENV PORT=8000

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip

COPY ../requirements.txt .
RUN pip install -r requirements.txt

CMD uvicorn user_service.asgi:application --host 0.0.0.0 --port ${PORT}

EXPOSE ${PORT}
