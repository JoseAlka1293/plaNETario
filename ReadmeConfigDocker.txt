# Proyecto plaNETario - Entorno Dockerizado

Este proyecto permite levantar toda la aplicación (Frontend, Backend, Base de Datos y phpMyAdmin) con un solo comando gracias a Docker.

---

## Pasos para Ejecutar el Proyecto

### 1 Requisitos Previos
- Copiar el archivo .tar con el stack del contenedor del proyecto
- Tener **Docker Desktop** instalado y en ejecución.
- Abrir la terminal, ir a la carpeta donde esta el contenedor de docker y escribir los comandos:
 
 "docker load -i planetario-frontend.tar"
 "docker load -i planetario-backend.tar"
 "docker load -i mysql8.tar"

- Copiar la carpeta con el codigo del proyecto en VS CODE
- Ahora para arrancar el contenedor escribir el comando "docker compose up -d"
- Verificar que esta todo up con "docker compose ps"

- Acceder a Frontend    http://localhost:5173
- Acceder a Backend     http://localhost:5000
- Acceder a phpMyAdmin  http://localhost:8080 

- En caso de que no funcionen los .tar hay que ejecutar el script de start.ps1 
para que se genere el contenedor nuevamente y sea completamente funcinal
comando ".\start.ps1" (todos los comandos son sin comillas)
---

### 2 Configuración del Archivo `.env`

```env
DB_HOST=db        # Usar "db" para Docker. Usar "localhost" sin Docker.
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=planetario_db
PORT=5000
JWT_SECRET=miclavesupersecreta
