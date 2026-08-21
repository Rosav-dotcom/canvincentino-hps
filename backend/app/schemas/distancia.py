from pydantic import BaseModel, Field

class DistanciaBase(BaseModel):
    distancia: str = Field(..., min_length=2, max_length=50, description="Distancia de la carrera")

class DistanciaCreate(DistanciaBase):
    pass

class DistanciaResponse(DistanciaBase):
    id_dista: int

    class Config:
        from_attributes = True
        