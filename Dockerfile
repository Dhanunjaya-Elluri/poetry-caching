FROM python:3.10-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY flask-app /app/

# Install poetry
RUN pip install poetry

# Install the dependencies
RUN poetry config virtualenvs.create false && poetry install --no-interaction

# RUN tests
RUN poetry run pytest

# Expose 5000 port
EXPOSE 5000

# Set the environment variables
ENV FLASK_APP=flask_app

# Run the application using poetry
CMD ["poetry", "run", "flask", "run", "--host=0.0.0.0"]
