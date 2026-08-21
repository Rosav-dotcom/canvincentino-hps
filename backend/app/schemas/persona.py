from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class PersonaBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    ap_pat: str = Field(..., min_length=2, max_length=50)
    ap_mat: str = Field(..., min_length=2, max_length=50)
    celular: str = Field(..., min_length=7, max_length=25)
    ci: str = Field(..., min_length=5, max_length=25)

    @validator('nombre', 'ap_pat', 'ap_mat')
    def validar_texto(cls, v):
        if not v.strip():
            raise ValueError('El campo no puede estar vacío')
        return v.strip()

class PersonaCreate(PersonaBase):
    pass

class PersonaResponse(PersonaBase):
    id_persona: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True