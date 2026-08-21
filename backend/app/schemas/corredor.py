from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.persona import PersonaResponse
from app.schemas.distancia import DistanciaResponse

class CorredorBase(BaseModel):
    numero_corredor: int = Field(..., gt=0)
    distancias_id_dista: int = Field(...)

class CorredorCreate(CorredorBase):
    pass

class CorredorResponse(CorredorBase):
    id_corredor: int
    persona: Optional[PersonaResponse] = None
    distancia: Optional[DistanciaResponse] = None

    class Config:
        from_attributes = True
