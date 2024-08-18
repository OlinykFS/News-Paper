## Project Name
News Paper
<br>
<br>
![project-preview](https://github.com/user-attachments/assets/8ee036f9-4102-433c-8f2e-a6020b6c8100)
 <br>
 <br>
This project is a news website that features JWT-based
                        authentication, API interactions with the backend to fetch news data, a user dashboard, and CRUD
                        operations for managing posts. Users can securely log in, access their personalized dashboard,
                        and interact with news posts
## Requirements
 - Docker

## Installation and Running

1. Clone the repository:
 git clone https://github.com/OlinykFS/News-Paper
 cd to your-repo

2. Create a .env file in the backend root directory:<br>

   - SECRET_KEY=your_secret_key<br>
   - DEBUG=True


3. Build and run containers:

  docker-compose up --build

5. Access the application:

  - Frontend: http://localhost:3000
  - Backend: http://localhost:8000/admin
    
Containers will automatically reload when code changes are made.

## Stopping the Project
 docker-compose down


