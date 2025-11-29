DROP DATABASE IF EXISTS cardapio_restaurante;
CREATE DATABASE cardapio_restaurante
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE cardapio_restaurante;

-- ====================================
-- TABELA DE USUÁRIOS
-- ====================================

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'usuario') DEFAULT 'usuario',
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ====================================
-- TABELA DE PRODUTOS
-- ====================================

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  imagem TEXT NOT NULL,
  categoria ENUM('Lanches', 'Bebidas') NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ====================================
-- USUÁRIO ADMIN JÁ DEFINITIVO
-- ====================================

INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('ADM', 'admin@cardapio.com', '$2a$10$cgJEBDhk04tqYcRdH7S72ubnyEeXpVksEW1OeToQ294wTa9.ZObu2', 'admin');

-- ====================================
-- PRODUTOS PADRÃO
-- ====================================

-- Lanches
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Hambúrguer Artesanal', 'Hambúrguer artesanal com carne bovina 180g, queijo cheddar, alface, tomate e molho especial da casa', 25.90, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200', 'Lanches'),
('X-Bacon Duplo', 'Dois hambúrgueres bovinos, bacon crocante, queijo derretido, cebola caramelizada e molho barbecue', 28.50, 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=1200', 'Lanches'),
('Frango Crispy', 'Filé de frango empanado crocante, alface americana, tomate, maionese temperada no pão brioche', 22.90, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1200', 'Lanches'),
('Vegetariano Especial', 'Hambúrguer de grão de bico, queijo vegano, rúcula, tomate seco e maionese de ervas', 24.90, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=1200', 'Lanches');

-- Bebidas
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Coca-Cola 350ml', 'Refrigerante de cola gelado, ideal para acompanhar seus lanches favoritos', 5.90, 'https://images.unsplash.com/photo-1630404365865-97ff92feba6a?w=1200', 'Bebidas'),
('Suco Natural de Laranja', 'Suco natural de laranja feito na hora com frutas selecionadas (500ml)', 8.50, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200', 'Bebidas'),
('Guaraná Antarctica 350ml', 'Refrigerante de guaraná gelado e refrescante', 5.50, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=1200', 'Bebidas'),
('Milkshake de Chocolate', 'Cremoso milkshake de chocolate com chantilly e granulado', 12.90, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200', 'Bebidas');
