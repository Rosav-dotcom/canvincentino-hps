from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.administrador import Administrador

class AuthService:
    """Servicio para autenticación de administradores"""
    
    @staticmethod
    def autenticar_administrador(db: Session, usuario: str, password: str):
        """
        Autenticar un administrador.
        NOTA: En producción, usar hash de contraseñas con bcrypt
        """
        administrador = db.query(Administrador).filter(
            Administrador.usuario == usuario
        ).first()
        
        if not administrador:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario o contraseña incorrectos"
            )
        
        # TODO: Implementar verificación de hash con bcrypt
        if administrador.password_hash != password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario o contraseña incorrectos"
            )
        
        return administrador
