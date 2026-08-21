from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
import os

# Configuración de seguridad
SECRET_KEY = os.getenv("SECRET_KEY", "clave_secreta_para_desarrollo_2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verificar_password(password_plano: str, password_hash: str) -> bool:
    """Verificar si la contraseña coincide con el hash"""
    try:
        return bcrypt.checkpw(
            password_plano.encode('utf-8'),
            password_hash.encode('utf-8') if isinstance(password_hash, str) else password_hash
        )
    except Exception:
        return False

def hash_password(password: str) -> str:
    """Generar hash de la contraseña"""
    # Truncar a 72 bytes máximo (límite de bcrypt)
    password_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def crear_token_acceso(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Crear token JWT"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decodificar_token(token: str) -> Optional[dict]:
    """Decodificar y verificar token JWT"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
