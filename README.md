# Documentation
## Steps to Insert a New Project Folder
- ```git clone https://github.com/TimothyAK/Local_Service_Finder```
- cd Local_Service_Finder
- Make a new branch (example, ```git checkout -b frontend```)
- Create a new folder inside the ```Local_Service_Finder``` folder
- Insert project files inside the folder
- ```git add .```
- ```git commit -m "{YOUR_MESSAGE_HERE}"```
- ```git remote add LSF https://github.com/TimothyAK/Local_Service_Finder```
- ```git push LSF {YOUR_PROJECT_BRANCH_NAME}```
- Do pull request in the repository

## Steps to run Django User Service
- From the ```Local_Service_Finder``` folder, do ```cd back-end_django```
- Create python virtual environment, ```python -m venv venv```
- Activate the virtual environment, ```venv\Scripts\activate.bat```
- Install django project requirements, ```pip install -r requirements.txt```
- Move to ```user_service``` directory, ```cd user_service```
- Run the server, ```uvicorn user_service.asgi:application```

## Steps to run Docker
- Run ```docker-compose -f docker-compose.django.yml up --build``` the first time to build the container(for django)
- Run ```docker-compose -f docker-compose.node.yml up --build``` the first time to build the container(for node)