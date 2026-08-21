CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ap_pat VARCHAR(50) NOT NULL,
    ap_mat VARCHAR(50) NOT NULL,
    celular VARCHAR(25) NOT NULL,
    ci VARCHAR(25) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE distancias (
    id_dista SERIAL PRIMARY KEY,
    distancia VARCHAR(50) NOT NULL
);

CREATE TABLE corredores (
    id_corredor SERIAL PRIMARY KEY,
    numero_corredor INT NOT NULL UNIQUE,
    distancias_id_dista INT NOT NULL,
    FOREIGN KEY (id_corredor) REFERENCES personas(id_persona),
    FOREIGN KEY (distancias_id_dista) REFERENCES distancias(id_dista)
);

CREATE TABLE administradores (
    id_admi SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    gmail VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (id_admi) REFERENCES personas(id_persona)
);