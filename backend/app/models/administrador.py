from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Administrador(Base):
    __tablename__ = "administradores"
    
    id_admi = Column(Integer, ForeignKey("personas.id_persona"), primary_key=True)
    usuario = Column(String(50), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    gmail = Column(String(255), unique=True, nullable=False)
    
    # Relación
    persona = relationship("Persona", backref="administrador")