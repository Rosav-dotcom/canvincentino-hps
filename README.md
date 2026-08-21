# Centro de Atención a la Mujer - Sistema de Gestión de Carreras

Sistema de gestión para el registro de corredores de la Fundación Centro de Atención a la Mujer.

## 📋 Descripción

Aplicación web para gestionar el registro de corredores en eventos deportivos. Permite:
- Registro público de corredores
- Panel administrativo con autenticación
- Visualización de corredores registrados
- Filtro por distancias

## 🛠️ Tecnologías

### Backend
- **Python 3.9+**
- **FastAPI** - Framework web
- **SQLAlchemy** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Hash de contraseñas

### Frontend
- **React 19**
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **React Router** - Navegación

### Infraestructura
- **Docker** - Contenedores
- **pgAdmin 4** - Gestión de BD

## 📁 Estructura del Proyecto

```
canvincentino-hps/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── security.py      # Seguridad y JWT
│   │   │   └── deps.py          # Dependencias
│   │   ├── database/
│   │   │   └── connection.py    # Conexión BD
│   │   ├── models/              # Modelos SQLAlchemy
│   │   │   ├── persona.py
│   │   │   ├── corredor.py
│   │   │   ├── administrador.py
│   │   │   └── distancia.py
│   │   ├── schemas/             # Schemas Pydantic
│   │   ├── routers/             # Endpoints API
│   │   ├── services/            # Lógica de negocio
│   │   └── main.py              # App principal
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Registro.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── database/
    ├── schema.sql
    └── seed.sql
```

## 🗄️ Base de Datos

### Tablas

- **personas**: Datos personales
  - id_persona (PK)
  - nombre, ap_pat, ap_mat
  - celular, ci (UNIQUE)

- **distancias**: Catálogo de distancias
  - id_dista (PK)
  - distancia (5K, 10K, 15K, 21K, 42K)

- **corredores**: Registro de corredores
  - id_corredor (FK → personas)
  - numero_corredor (UNIQUE)
  - distancias_id_dista (FK → distancias)

- **administradores**: Acceso al panel
  - id_admi (FK → personas)
  - usuario, password_hash, gmail

## 🚀 Instalación

### Requisitos previos

- Docker
- Node.js 18+
- Python 3.9+
- PostgreSQL (en Docker)

### 1. Base de Datos

```bash
# Iniciar PostgreSQL en Docker
docker run -d \
  --name my-postgres \
  -e POSTGRES_PASSWORD=admin123 \
  -p 5432:5432 \
  postgres

# Crear base de datos
docker exec -it my-postgres psql -U postgres -c "CREATE DATABASE canvincentino_hps;"

# Ejecutar esquema
docker exec -it my-postgres psql -U postgres -d canvincentino_hps -f /schema.sql

# Cargar datos iniciales
docker exec -it my-postgres psql -U postgres -d canvincentino_hps -f /seed.sql
```

### 2. Backend

```bash
cd backend

# Crear entorno virtual
python3 -m venv venv

# Activar
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus datos

# Iniciar servidor
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## 🌐 Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **pgAdmin**: http://localhost:5050

## 🔐 Autenticación

### Credenciales por defecto

- **Usuario**: admin
- **Contraseña**: admin123

### Endpoints

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/corredores/` - Registrar corredor (público)
- `GET /api/corredores/` - Listar corredores (requiere token)
- `GET /api/distancias/` - Listar distancias

## 📝 Variables de Entorno

### Backend (.env)

```env
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/canvincentino_hps
SECRET_KEY=tu_clave_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🧪 Pruebas

```bash
# Probar registro
curl -X POST http://localhost:8000/api/corredores/ \
  -H "Content-Type: application/json" \
  -d '{
    "persona_data": {
      "nombre": "Test",
      "ap_pat": "Prueba",
      "ap_mat": "Test",
      "celular": "70012345",
      "ci": "12345678"
    },
    "corredor_data": {
      "numero_corredor": 1,
      "distancias_id_dista": 1
    }
  }'

# Probar login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

## 🎨 Características

- ✅ Registro público de corredores
- ✅ Validación de campos obligatorios
- ✅ CI único (no permite duplicados)
- ✅ Número de corredor único
- ✅ Autenticación JWT
- ✅ Dashboard administrativo
- ✅ Búsqueda de corredores
- ✅ Estadísticas por distancia
- ✅ Diseño responsive
- ✅ Glassmorphism UI

## 📄 Licencia

© 2024 Centro de Atención a la Mujer. Todos los derechos reservados.
EOF
```
