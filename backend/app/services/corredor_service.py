from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.persona import Persona
from app.models.corredor import Corredor
from app.models.distancia import Distancia
from app.schemas.persona import PersonaCreate
from app.schemas.corredor import CorredorCreate

class CorredorService:
    """Servicio para la lógica de negocio de corredores"""
    
    @staticmethod
    def registrar_corredor(
        db: Session,
        persona_data: PersonaCreate,
        corredor_data: CorredorCreate
    ):
        """
        Registra un nuevo corredor con sus datos personales.
        """
        
        # 1. Verificar CI único
        persona_existente = db.query(Persona).filter(
            Persona.ci == persona_data.ci
        ).first()
        
        if persona_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El CI {persona_data.ci} ya está registrado"
            )
        
        # 2. Verificar número de corredor único
        numero_existente = db.query(Corredor).filter(
            Corredor.numero_corredor == corredor_data.numero_corredor
        ).first()
        
        if numero_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El número de corredor {corredor_data.numero_corredor} ya está asignado"
            )
        
        # 3. Verificar que la distancia existe
        distancia = db.query(Distancia).filter(
            Distancia.id_dista == corredor_data.distancias_id_dista
        ).first()
        
        if not distancia:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"La distancia con ID {corredor_data.distancias_id_dista} no existe"
            )
        
        # 4. Crear persona
        nueva_persona = Persona(**persona_data.dict())
        db.add(nueva_persona)
        db.flush()
        
        # 5. Crear corredor
        nuevo_corredor = Corredor(
            id_corredor=nueva_persona.id_persona,
            numero_corredor=corredor_data.numero_corredor,
            distancias_id_dista=corredor_data.distancias_id_dista
        )
        db.add(nuevo_corredor)
        
        # 6. Confirmar transacción
        db.commit()
        db.refresh(nuevo_corredor)
        
        return nuevo_corredor
    
    @staticmethod
    def obtener_todos(db: Session):
        """Obtener todos los corredores registrados"""
        return db.query(Corredor).all()
    
    @staticmethod
    def obtener_por_id(db: Session, corredor_id: int):
        """Obtener un corredor por su ID"""
        corredor = db.query(Corredor).filter(
            Corredor.id_corredor == corredor_id
        ).first()
        
        if not corredor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Corredor con ID {corredor_id} no encontrado"
            )
        
        return corredor
    
    @staticmethod
    def buscar_por_ci(db: Session, ci: str):
        """Buscar un corredor por su CI"""
        corredor = db.query(Corredor).join(Persona).filter(
            Persona.ci == ci
        ).first()
        
        if not corredor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No se encontró corredor con CI {ci}"
            )
        
        return corredor
