DROP DATABASE IF EXISTS cardapio_restaurante;
CREATE DATABASE cardapio_restaurante
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE cardapio_restaurante;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  imagem VARCHAR(2048) NOT NULL,
  categoria ENUM('Lanches', 'Bebidas') NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lanches
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Hambúrguer artesanal','Hambúrguer artesanal com carne bovina, queijo, alface, tomate e molho especial da casa',25.90,'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200','Lanches'),
('X-Bacon','X-Bacon com dupla carne, bacon crocante, queijo derretido e cebola caramelizada',28.50,'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=686','Lanches');

-- Bebidas
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
('Coca-Cola','Refrigerante de cola gelado, ideal para acompanhar seus lanches favoritos',5.90,'https://images.unsplash.com/photo-1630404365865-97ff92feba6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764','Bebidas'),
('Suco natural de laranja','Suco natural de laranja, feito na hora com frutas selecionadas',8.50,'https://images.unsplash.com/photo-1607690506833-498e04ab3ffa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687','Bebidas');
