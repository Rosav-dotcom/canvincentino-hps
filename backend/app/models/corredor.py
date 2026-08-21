from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Corredor(Base):
    __tablename__ = "corredores"
    
    id_corredor = Column(Integer, ForeignKey("personas.id_persona"), primary_key=True)
    numero_corredor = Column(Integer, unique=True, nullable=False, index=True)
    distancias_id_dista = Column(Integer, ForeignKey("distancias.id_dista"), nullable=False)
    
    # Relaciones
    persona = relationship("Persona", backref="corredor")
    distancia = relationship("Distancia", backref="corredores")
    