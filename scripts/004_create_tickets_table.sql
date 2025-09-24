-- Create tickets table for storing individual ticket numbers
CREATE TABLE IF NOT EXISTS tickets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    raffle_id BIGINT UNSIGNED NOT NULL,
    purchase_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    ticket_number INT UNSIGNED NOT NULL,
    is_winner BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_raffle_ticket (raffle_id, ticket_number),
    INDEX idx_raffle_id (raffle_id),
    INDEX idx_purchase_id (purchase_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_is_winner (is_winner)
);
