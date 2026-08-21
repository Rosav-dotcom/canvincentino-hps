from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.distancia import Distancia
from app.schemas.distancia import DistanciaCreate, DistanciaResponse

router = APIRouter(prefix="/api/distancias", tags=["distancias"])

@router.get("/", response_model=List[DistanciaResponse])
def listar_distancias(db: Session = Depends(get_db)):
    """Obtener todas las distancias disponibles"""
    distancias = db.query(Distancia).all()
    return distancias

@router.post("/", response_model=DistanciaResponse, status_code=status.HTTP_201_CREATED)
def crear_distancia(distancia: DistanciaCreate, db: Session = Depends(get_db)):
    """Crear una nueva distancia"""
    nueva_distancia = Distancia(**distancia.dict())
    db.add(nueva_distancia)
    db.commit()
    db.refresh(nueva_distancia)
    return nueva_distancia