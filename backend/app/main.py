from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine, Base
from app.models import Persona, Distancia, Corredor, Administrador
from app.routers import corredores, distancias, auth

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Centro de Atención a la Mujer API",
    description="API para el sistema de gestión de carreras",
    version="1.0.0"
)

# Configurar CORS - PERMITIR TODOS LOS ORÍGENES EN DESARROLLO
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todo en desarrollo
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(corredores.router)
app.include_router(distancias.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {
        "message": "Bienvenido a la API del Centro de Atención a la Mujer",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected"}
