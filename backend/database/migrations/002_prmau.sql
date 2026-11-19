-- Migración PRMAU: tablas de recepción de formularios y catálogos de vulnerabilidad.
-- Los formularios se almacenan como payload JSON para admitir evolución de campos
-- sin acoplarse a un esquema rígido mientras se define el diccionario definitivo.

CREATE TABLE IF NOT EXISTS `prmau_ficha_vulnerabilidad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `cod_catastral` VARCHAR(64) NULL,
  `payload` JSON NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `prmau_ficha_socioeconomica` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `payload` JSON NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Catálogos usados por el formulario de vulnerabilidad (FormVulne).
CREATE TABLE IF NOT EXISTS `prmau_parroquias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `cod` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `prmau_sectores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parroquia_id` INT NOT NULL,
  `nombre` VARCHAR(150) NOT NULL,
  `cod` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_prmau_sectores_parroquia` (`parroquia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `prmau_manzanas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sector_id` INT NOT NULL,
  `nombre` VARCHAR(150) NOT NULL,
  `cod` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_prmau_manzanas_sector` (`sector_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `prmau_organizaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parroquia_id` INT NOT NULL,
  `nombre` VARCHAR(150) NOT NULL,
  `cod` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_prmau_org_parroquia` (`parroquia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
