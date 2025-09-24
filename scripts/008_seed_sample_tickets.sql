-- Insert sample tickets for testing
-- iPhone 15 Pro tickets (raffle_id = 1)
INSERT INTO tickets (raffle_id, purchase_id, customer_id, ticket_number) VALUES 
-- João Silva Santos (purchase_id = 1) - 5 tickets
(1, 1, 1, 1), (1, 1, 1, 2), (1, 1, 1, 3), (1, 1, 1, 4), (1, 1, 1, 5),
-- Maria Oliveira Costa (purchase_id = 2) - 3 tickets  
(1, 2, 2, 6), (1, 2, 2, 7), (1, 2, 2, 8),
-- Pedro Souza Lima (purchase_id = 3) - 10 tickets
(1, 3, 3, 9), (1, 3, 3, 10), (1, 3, 3, 11), (1, 3, 3, 12), (1, 3, 3, 13),
(1, 3, 3, 14), (1, 3, 3, 15), (1, 3, 3, 16), (1, 3, 3, 17), (1, 3, 3, 18);

-- Notebook Gamer tickets (raffle_id = 2)
INSERT INTO tickets (raffle_id, purchase_id, customer_id, ticket_number) VALUES 
-- João Silva Santos (purchase_id = 4) - 2 tickets
(2, 4, 1, 1), (2, 4, 1, 2),
-- Ana Carolina Ferreira (purchase_id = 5) - 1 ticket
(2, 5, 4, 3);

-- Vale Compras tickets (raffle_id = 3)
INSERT INTO tickets (raffle_id, purchase_id, customer_id, ticket_number) VALUES 
-- Maria Oliveira Costa (purchase_id = 6) - 20 tickets
(3, 6, 2, 1), (3, 6, 2, 2), (3, 6, 2, 3), (3, 6, 2, 4), (3, 6, 2, 5),
(3, 6, 2, 6), (3, 6, 2, 7), (3, 6, 2, 8), (3, 6, 2, 9), (3, 6, 2, 10),
(3, 6, 2, 11), (3, 6, 2, 12), (3, 6, 2, 13), (3, 6, 2, 14), (3, 6, 2, 15),
(3, 6, 2, 16), (3, 6, 2, 17), (3, 6, 2, 18), (3, 6, 2, 19), (3, 6, 2, 20),
-- Carlos Eduardo Alves (purchase_id = 7) - 15 tickets
(3, 7, 5, 21), (3, 7, 5, 22), (3, 7, 5, 23), (3, 7, 5, 24), (3, 7, 5, 25),
(3, 7, 5, 26), (3, 7, 5, 27), (3, 7, 5, 28), (3, 7, 5, 29), (3, 7, 5, 30),
(3, 7, 5, 31), (3, 7, 5, 32), (3, 7, 5, 33), (3, 7, 5, 34), (3, 7, 5, 35),
-- Pedro Souza Lima (purchase_id = 8) - 8 tickets
(3, 8, 3, 36), (3, 8, 3, 37), (3, 8, 3, 38), (3, 8, 3, 39),
(3, 8, 3, 40), (3, 8, 3, 41), (3, 8, 3, 42), (3, 8, 3, 43);
