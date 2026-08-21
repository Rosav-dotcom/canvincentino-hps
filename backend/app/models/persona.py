from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.connection import Base

class Persona(Base):
    __tablename__ = "personas"
    
    id_persona = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    ap_pat = Column(String(50), nullable=False)
    ap_mat = Column(String(50), nullable=False)
    celular = Column(String(25), nullable=False)
    ci = Column(String(25), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())
    