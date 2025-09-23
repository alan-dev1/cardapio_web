CREATE TABLE cardapio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao TEXT,
    preco DECIMAL(10,2),
    categoria VARCHAR(50),
    imagem_url VARCHAR(255)
);

INSERT INTO cardapio (nome, descricao, preco, categoria, imagem_url) VALUES
-- Entradas
('Bruschetta', 'Pão tostado com tomate, manjericão e azeite', 15.90, 'Entradas', 'https://via.placeholder.com/150'),
('Batata Frita', 'Batata frita crocante servida com ketchup', 12.50, 'Entradas', 'https://via.placeholder.com/150'),

-- Pratos Principais
('Bife Acebolado', 'Bife grelhado com cebolas caramelizadas', 29.90, 'Pratos Principais', 'https://via.placeholder.com/150'),
('Spaghetti à Bolonhesa', 'Massa com molho de carne tradicional', 27.50, 'Pratos Principais', 'https://via.placeholder.com/150'),
('Filé de Tilápia', 'Filé de tilápia grelhado com legumes', 32.00, 'Pratos Principais', 'https://via.placeholder.com/150'),

-- Pratos Executivos
('PF Frango', 'Arroz, feijão, salada e frango grelhado', 22.50, 'Pratos Executivos', 'https://via.placeholder.com/150'),

-- Bebidas
('Suco de Laranja', 'Suco natural de laranja', 8.50, 'Bebidas', 'https://via.placeholder.com/150'),
('Cerveja Lata', 'Cerveja gelada 350ml', 10.00, 'Bebidas', 'https://via.placeholder.com/150'),

-- Sobremesas
('Pudim', 'Pudim de leite condensado cremoso', 12.00, 'Sobremesas', 'https://via.placeholder.com/150'),
('Brigadeiro de Colher', 'Brigadeiro cremoso servido em pote', 10.00, 'Sobremesas', 'https://via.placeholder.com/150');
