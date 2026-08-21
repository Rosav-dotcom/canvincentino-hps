from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.persona import PersonaCreate
from app.schemas.corredor import CorredorCreate, CorredorResponse
from app.services.corredor_service import CorredorService
from app.core.deps import get_current_admin

router = APIRouter(prefix="/api/corredores", tags=["corredores"])

@router.post("/", response_model=CorredorResponse, status_code=status.HTTP_201_CREATED)
def registrar_corredor(
    persona_data: PersonaCreate,
    corredor_data: CorredorCreate,
    db: Session = Depends(get_db)
):
    """Registrar un nuevo corredor (público)"""
    return CorredorService.registrar_corredor(db, persona_data, corredor_data)

@router.get("/", response_model=List[CorredorResponse])
def listar_corredores(
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Listar todos los corredores (requiere autenticación)"""
    return CorredorService.obtener_todos(db)
