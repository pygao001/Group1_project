-- select * from daily_price;
CREATE TABLE IF NOT EXISTS stock_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    share_name VARCHAR(50) NOT NULL,
    shares INT NOT NULL,
    buy_in_date DATE NOT NULL,
    buy_in_price DECIMAL(10, 2) NOT NULL,
    sold_out_price DECIMAL(10, 2) DEFAULT NULL
);

INSERT INTO stock_transactions (share_name, shares, buy_in_date, buy_in_price, sold_out_price)
VALUES
    ('GOOG', 350, '2024-08-01', 139.00, NULL),
    ('AMZN', 150, '2024-08-02', 149.93, NULL),
    ('AAPL', 300, '2024-08-03', 185.25, NULL),
    ('META', 200, '2024-08-04', 346.29, NULL),
    ('NVDA', 100, '2024-08-05', 48.17, NULL);  -- Shares not sold yet
 












