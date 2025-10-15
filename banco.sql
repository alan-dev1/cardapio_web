-- =========================================================
-- BANCO DE DADOS: cardapio_restaurante
-- =========================================================
CREATE DATABASE IF NOT EXISTS cardapio_restaurante
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE cardapio_restaurante;

-- =========================================================
-- TABELA: produtos
-- =========================================================
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255) DEFAULT '/images/default.png',
    categoria ENUM('Lanches', 'Bebidas') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- INSERINDO LANCHES
-- =========================================================
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Hambúrguer artesanal', 'Hambúrguer artesanal com carne bovina, queijo, alface, tomate e molho especial da casa', 25.90, '/images/lanche1.png', 'Lanches'),
('X-Bacon', 'X-Bacon com dupla carne, bacon crocante, queijo derretido e cebola caramelizada', 28.50, '/images/lanche2.png', 'Lanches'),
('Chicken Burger', 'Chicken Burger com frango grelhado, queijo mussarela, alface e maionese temperada', 22.90, '/images/lanche3.png', 'Lanches'),
('Veggie Burger', 'Veggie Burger com hambúrguer de grão-de-bico, queijo vegano e vegetais frescos', 24.90, '/images/lanche4.png', 'Lanches'),
('Fish Burger', 'Fish Burger com filé de peixe empanado, queijo e molho tártaro caseiro', 26.90, '/images/lanche5.png', 'Lanches'),
('BBQ Burger', 'BBQ Burger com carne defumada, cebola roxa, picles e molho barbecue artesanal', 29.90, '/images/lanche6.png', 'Lanches');

-- =========================================================
-- INSERINDO BEBIDAS
-- =========================================================
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Coca-Cola', 'Refrigerante de cola gelado, ideal para acompanhar seus lanches favoritos', 5.90, '/images/bebida1.png', 'Bebidas'),
('Suco natural de laranja', 'Suco natural de laranja, feito na hora com frutas selecionadas', 8.50, '/images/bebida2.png', 'Bebidas'),
('Água mineral sem gás', 'Água mineral sem gás, refrescante e pura para matar sua sede', 3.90, '/images/bebida3.png', 'Bebidas'),
('Milkshake de chocolate', 'Milkshake de chocolate cremoso com chantilly e calda especial', 12.90, '/images/bebida4.png', 'Bebidas'),
('Café expresso premium', 'Café expresso premium, encorpado e aromático para os amantes do café', 6.50, '/images/bebida5.png', 'Bebidas'),
('Smoothie de frutas vermelhas', 'Smoothie de frutas vermelhas com iogurte natural e granola crocante', 14.90, '/images/bebida6.png', 'Bebidas');
