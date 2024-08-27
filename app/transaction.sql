use pubs;
-- insert into stores (stor_id, stor_name, stor_address, city, state, zip) 
-- values ("9000", "Books Galore", "123 Main St","Anytown", "NY", "12345");
-- insert into employee (emp_id, fname, minit, lname, job_id, pub_id, hire_date)
-- values ("XYZ123", "John", "D","Smith","6","9952","19800101");

-- set sql_safe_updates=0;
-- update employee set job_lvl=20 where job_lvl <100;

-- update stores set stor_address="1234New Street" 
-- where stor_name="News&Brews";

-- delete from authors where city like "S%";

-- select count(*) as Count_author from authors;
-- select avg(price) from titles;
-- select type, count(title) from titles
-- group by type;

-- select state, count(au_id) as id_count from authors 
-- group by state having id_count>1;
-- select type, price from titles
-- group by type having max(price)>15;

-- select type, price from titles
-- group by type having min(price) < 20;

-- select type, avg(price) as avg_price from titles where advance >5000
-- group by type order by avg_price desc;

-- select* from authors as a inner join titleauthor as t
-- on a.au_id=t.au_id;

-- select p.pub_id, t.price, p.pub_name from publishers p
-- inner join titles t on p.pub_id=t.title_id;

-- select titles.title_id, avg(titles.price) from titles
-- inner join publishers on titles.pub_id=publishers.pub_id

-- select titles.title_id, titleauthor.au_id from titles
-- right join athors a on titleauthor.au_id=a.au_id
-- having count(titleauthor.title_id)>1;

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
 












