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
        """Registrar un nuevo corredor"""
        
        persona_dict = persona_data.model_dump() if hasattr(persona_data, 'model_dump') else persona_data.dict()
        corredor_dict = corredor_data.model_dump() if hasattr(corredor_data, 'model_dump') else corredor_data.dict()
        
        # 1. Verificar CI único
        persona_existente = db.query(Persona).filter(
            Persona.ci == persona_dict['ci']
        ).first()
        
        if persona_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El CI {persona_dict['ci']} ya está registrado"
            )
        
        # 2. Verificar número de corredor único
        numero_existente = db.query(Corredor).filter(
            Corredor.numero_corredor == corredor_dict['numero_corredor']
        ).first()
        
        if numero_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El número de corredor {corredor_dict['numero_corredor']} ya está asignado"
            )
        
        # 3. Verificar que la distancia existe
        distancia = db.query(Distancia).filter(
            Distancia.id_dista == corredor_dict['distancias_id_dista']
        ).first()
        
        if not distancia:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="La distancia seleccionada no existe"
            )
        
        # 4. Crear persona primero
        nueva_persona = Persona(**persona_dict)
        db.add(nueva_persona)
        db.flush()  # Para obtener el ID generado
        
        # 5. Crear corredor con el ID de la persona
        nuevo_corredor = Corredor(
            id_corredor=nueva_persona.id_persona,  # FK a persona
            numero_corredor=corredor_dict['numero_corredor'],
            distancias_id_dista=corredor_dict['distancias_id_dista']
        )
        db.add(nuevo_corredor)
        
        # 6. Commit
        db.commit()
        db.refresh(nuevo_corredor)
        
        return nuevo_corredor
    
    @staticmethod
    def obtener_todos(db: Session):
        """Obtener todos los corredores"""
        return db.query(Corredor).all()
    
    @staticmethod
    def obtener_por_id(db: Session, corredor_id: int):
        """Obtener corredor por ID"""
        corredor = db.query(Corredor).filter(
            Corredor.id_corredor == corredor_id
        ).first()
        
        if not corredor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Corredor no encontrado"
            )
        
        return corredor
