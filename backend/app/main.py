from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine, Base
from app.models import Persona, Distancia, Corredor, Administrador

# Crear tablas (aunque ya existen, esto verifica la estructura)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Canvincentino HPS API",
    description="API para el sistema de gestión de la Fundación Canvincentino",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Bienvenido a la API de Canvincentino HPS",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected"}