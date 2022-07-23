create TABLE posters(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    -- picture ???
    year_of_release SERIAL,
    description TEXT,
    rating NUMERIC
);
