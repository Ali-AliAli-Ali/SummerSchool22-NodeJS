CREATE TABLE posters(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    genre VARCHAR(255),
    year_of_release SERIAL,
    description TEXT,
    rating NUMERIC,
    picture TEXT
);
