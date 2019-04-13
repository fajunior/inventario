GRANT ALL PRIVILEGES ON *.* TO 'inventario'@'localhost' IDENTIFIED BY 'inventario';
CREATE DATABASE inventario;
CREATE TABLE machine (
	codigo INT(11) NOT NULL AUTO_INCREMENT,
    tipoEquipamento VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    mesAnoAquisicao VARCHAR(6) NOT NULL,
    valorAquisicao decimal(15,2) NOT NULL,
    nomeFoto VARCHAR(200) ,
    CONSTRAINT PK_MACHINE PRIMARY KEY (codigo)
);
