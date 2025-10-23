-- Crear tabla items
CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Insertar registro inicial sin duplicar
INSERT INTO items (name, description)
VALUES ('Primer item', 'Item inicial para pruebas')
ON DUPLICATE KEY UPDATE id=id;
