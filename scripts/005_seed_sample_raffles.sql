-- Insert sample raffles for testing
INSERT INTO raffles (
    slug, 
    title, 
    description, 
    rules, 
    prize_image, 
    prize_images, 
    ticket_price, 
    total_tickets, 
    sold_tickets, 
    draw_date, 
    status
) VALUES 
(
    'iphone-15-pro',
    'iPhone 15 Pro 256GB',
    'Concorra a um iPhone 15 Pro 256GB novinho em folha! Sua participação ajuda nossa causa solidária.',
    'Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Prêmio deve ser retirado em até 30 dias.',
    '/iphone-15-pro-hands.png',
    JSON_ARRAY('/iphone-15-pro-front.jpg', '/iphone-15-pro-back.jpg', '/iphone-15-pro-box.jpg'),
    10.00,
    1000,
    347,
    '2025-02-15 20:00:00',
    'active'
),
(
    'notebook-gamer',
    'Notebook Gamer RTX 4060',
    'Notebook gamer completo para você arrasar nos jogos! Participe e ajude nossa instituição.',
    'Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Prêmio deve ser retirado em até 30 dias.',
    '/gaming-laptop.jpg',
    JSON_ARRAY('/gaming-laptop-open.jpg', '/gaming-laptop-closed.jpg', '/gaming-laptop-specs.jpg'),
    25.00,
    800,
    156,
    '2025-03-01 20:00:00',
    'active'
),
(
    'vale-compras-1000',
    'Vale Compras R$ 1.000',
    'Vale compras de R$ 1.000 para você usar onde quiser! Sua participação faz a diferença.',
    'Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Vale deve ser utilizado em até 90 dias.',
    '/shopping-voucher-1000-reais.jpg',
    JSON_ARRAY('/shopping-voucher-card.jpg', '/money-bills-1000-reais.jpg'),
    5.00,
    2000,
    892,
    '2025-01-30 20:00:00',
    'active'
);
