from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.persona import PersonaResponse

class AdministradorBase(BaseModel):
    usuario: str = Field(..., min_length=3, max_length=50, description="Nombre de usuario")
    gmail: str = Field(..., description="Correo electrónico")

class AdministradorCreate(AdministradorBase):
    password: str = Field(..., min_length=6, description="Contraseña")

class AdministradorResponse(AdministradorBase):
    id_admi: int
    persona: Optional[PersonaResponse] = None

    class Config:
        from_attributes = True