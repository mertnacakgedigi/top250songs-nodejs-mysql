CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name LONGTEXT NOT NULL,
    artist LONGTEXT,
    image LONGTEXT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(45),
	last_name varchar(45),
	email varchar(45),
	password	longtext,
	created	datetime
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
	rating int,
	user_id int,
	song_id int,
);