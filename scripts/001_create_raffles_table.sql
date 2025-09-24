-- Create raffles table for storing raffle information
CREATE TABLE IF NOT EXISTS raffles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rules TEXT NOT NULL,
    prize_image VARCHAR(500),
    prize_images JSON,
    ticket_price DECIMAL(10, 2) NOT NULL,
    total_tickets INT UNSIGNED NOT NULL,
    sold_tickets INT UNSIGNED DEFAULT 0,
    draw_date DATETIME NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_slug (slug),
    INDEX idx_draw_date (draw_date)
);
