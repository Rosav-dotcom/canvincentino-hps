from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.administrador import Administrador
from app.core.security import verificar_password

class AuthService:
    """Servicio para autenticación de administradores"""
    
    @staticmethod
    def autenticar_administrador(db: Session, usuario: str, password: str):
        """
        Autenticar un administrador con hash de contraseña
        """
        administrador = db.query(Administrador).filter(
            Administrador.usuario == usuario
        ).first()
        
        if not administrador:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario o contraseña incorrectos"
            )
        
        if not verificar_password(password, administrador.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario o contraseña incorrectos"
            )
        
        return administrador
