# Proyecto plaNETario - Entorno Dockerizado

Este proyecto permite levantar toda la aplicación (Frontend, Backend, Base de Datos y phpMyAdmin) con un solo comando gracias a Docker.

---

## Pasos para Ejecutar el Proyecto

### 1 Requisitos Previos

- Copiar los archivos .tar de las imagenes del Docker en el mismo directorio en el que esta el codigo del proyecto
- Tener **Docker Desktop** instalado y en ejecución.
- Abrir la terminal, ir a la carpeta donde esta el contenedor de docker y escribir los comandos:
 
 "docker load -i planetario-frontend.tar"
 "docker load -i planetario-backend.tar"

- Abrir la carpeta del proyecto en VS CODE
- Ahora para arrancar el contenedor escribir los comandos "docker-compose down" y "docker compose up -d"
- Verificar que esta todo up con "docker compose ps"

- Acceder a Frontend    http://localhost:5173
- Acceder a Backend     http://localhost:5000
- Acceder a phpMyAdmin  http://localhost:8080 

- En caso de que no funcionen los .tar hay que tener abierta la aplicacion de Docker Desktop y depues 
ejecutar el script de start.ps1 para que se genere el contenedor nuevamente y sea completamente funcinal
el script se puede ejecutar con el comando ".\start.ps1" (todos los comandos son sin comillas)
---

### 2 Configuraciones de archivos extra

- Sobre el archivo docker-compose.yml

Verificar que las siguientes lineas estan comentadas y tambien que las secciones de 
"image:" estan correctamente definidas y apuntando a las imagenes .tar creadas anteriormente,
en caso de no funcionar habra que comentar estas lineas de "image:", dejar sin comentar las lineas
de "build:" sobre backend y frontend, y abrir la aplicacion de Docker Desktop, despues, navegar 
desde la terminal en Visual Studio hasta la carpeta de "plaNETario" para poder utilizar 
el comando ".\start.ps1" para ejecutar el scrpit sobre la terminal de Visual Studio

  backend:
    # **Desarrollo** descomentar esta linea y comenta la seccion de 'image: …'
    # build: ./backend

    # **En el equipo destino**, despues de hacer `docker load -i planetario-backend-image.tar`,
    # image: planetario-backend:latest

  frontend:
    # **Desarrollo** descomentar esta linea y comenta la seccion de 'image: …'
    # build: ./frontend

    # **Equipo destino**, despues de `docker load -i planetario-frontend-image.tar`:
    # image: planetario-frontend:latest


- Sobre el archivo .env

DB_HOST=db        # Usar "db" para Docker. Usar "localhost" sin Docker.
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=planetario_db
PORT=5000
JWT_SECRET=miclavesupersecreta

- Por ultimo comprobar tambien el archivo "vite.config.js" del apartado "frontend"
para ver si las rutas estan correctamente definidas segun la forma de mostrar o trabajar 
con el codigo que queramos

      "/api": {
        target: "http://backend:5000",     //backend para docker //localhost para local
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/uploads": {
        target: "http://backend:5000",      //backend para docker //localhost para local
        changeOrigin: true,
        secure: false,
      },