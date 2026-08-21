from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class Distancia(Base):
    __tablename__ = "distancias"
    
    id_dista = Column(Integer, primary_key=True, index=True, autoincrement=True)
    distancia = Column(String(50), nullable=False)
    