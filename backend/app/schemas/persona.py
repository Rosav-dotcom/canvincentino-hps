from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class PersonaBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50, description="Nombre de la persona")
    ap_pat: str = Field(..., min_length=2, max_length=50, description="Apellido paterno")
    ap_mat: str = Field(..., min_length=2, max_length=50, description="Apellido materno")
    celular: str = Field(..., min_length=7, max_length=25, description="Número de celular")
    ci: str = Field(..., min_length=5, max_length=25, description="Carnet de identidad")

    @validator('nombre', 'ap_pat', 'ap_mat')
    def validar_texto(cls, v):
        if not v.strip():
            raise ValueError('El campo no puede estar vacío')
        return v.strip()

    @validator('ci')
    def validar_ci(cls, v):
        if not v.strip():
            raise ValueError('El CI no puede estar vacío')
        return v.strip()

class PersonaCreate(PersonaBase):
    pass

class PersonaResponse(PersonaBase):
    id_persona: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True