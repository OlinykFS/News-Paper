# Используйте базовый образ Python
FROM python:3.12

# Установите рабочую директорию
WORKDIR /app

# Копируйте файлы проекта
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Копируйте остальной код
COPY . .

# Определите точку входа или команду
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
