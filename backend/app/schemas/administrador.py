from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.persona import PersonaResponse

class AdministradorBase(BaseModel):
    usuario: str = Field(..., min_length=3, max_length=50)
    gmail: str = Field(...)

class AdministradorCreate(AdministradorBase):
    password: str = Field(..., min_length=6)

class AdministradorResponse(AdministradorBase):
    id_admi: int
    persona: Optional[PersonaResponse] = None

    class Config:
        from_attributes = True