-- Insert sample purchases for testing
INSERT INTO purchases (raffle_id, customer_id, quantity, total_price, payment_status, payment_method) VALUES 
(1, 1, 5, 50.00, 'paid', 'pix'),
(1, 2, 3, 30.00, 'paid', 'credit_card'),
(1, 3, 10, 100.00, 'paid', 'pix'),
(2, 1, 2, 50.00, 'paid', 'credit_card'),
(2, 4, 1, 25.00, 'paid', 'pix'),
(3, 2, 20, 100.00, 'paid', 'pix'),
(3, 5, 15, 75.00, 'paid', 'credit_card'),
(3, 3, 8, 40.00, 'paid', 'pix');
