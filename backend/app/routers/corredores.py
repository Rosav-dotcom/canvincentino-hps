from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.persona import PersonaCreate
from app.schemas.corredor import CorredorCreate, CorredorResponse
from app.services.corredor_service import CorredorService

router = APIRouter(prefix="/api/corredores", tags=["corredores"])

@router.post("/", response_model=CorredorResponse, status_code=status.HTTP_201_CREATED)
def registrar_corredor(
    persona_data: PersonaCreate,
    corredor_data: CorredorCreate,
    db: Session = Depends(get_db)
):
    """Registrar un nuevo corredor"""
    return CorredorService.registrar_corredor(db, persona_data, corredor_data)

@router.get("/", response_model=List[CorredorResponse])
def listar_corredores(db: Session = Depends(get_db)):
    """Listar todos los corredores"""
    return CorredorService.obtener_todos(db)

@router.get("/{corredor_id}", response_model=CorredorResponse)
def obtener_corredor(corredor_id: int, db: Session = Depends(get_db)):
    """Obtener corredor por ID"""
    return CorredorService.obtener_por_id(db, corredor_id)

@router.get("/buscar/{ci}", response_model=CorredorResponse)
def buscar_por_ci(ci: str, db: Session = Depends(get_db)):
    """Buscar corredor por CI"""
    return CorredorService.buscar_por_ci(db, ci)
