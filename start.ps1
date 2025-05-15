Write-Host "Apagando contenedores anteriores..."
docker-compose down

Write-Host "Levantando entorno de Docker..."
docker-compose up --build -d

Write-Host ""
Write-Host "Entorno levantado con exito:"
Write-Host "- Frontend:      http://localhost:5173"
Write-Host "- Backend API:   http://localhost:5000"
Write-Host "- phpMyAdmin:    http://localhost:8080"
