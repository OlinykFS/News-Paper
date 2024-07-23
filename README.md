# Project Name
aiGen

## Requirements
- Docker

## Installation and Running

1. Clone the repository:
git clone https://github.com/OlinykFS/Blog-aiGen
cd your-repo

2. Create a .env file in the backend root directory:
SECRET_KEY=your_secret_key
DEBUG=True

3. Build and run containers:
docker-compose up --build

4. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Development

Containers will automatically reload when code changes are made.

## Stopping the Project
docker-compose down

## Additional Information

This project is an AI-powered blog post generation system with automated topic discovery. Key features include:

- Web scraping to automatically gather post topics from various internet resources
- AI-driven content generation based on scraped topics
- Web interface to view and manage generated posts

The system autonomously creates a full blogging pipeline: from topic discovery to content creation and presentation. This project is under active development, and features may expand or change.
