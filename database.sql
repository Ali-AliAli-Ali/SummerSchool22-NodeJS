--create TABLE Administrator(
--    admin_token SERIAL PRIMARY KEY
--);

create TABLE Poster(
    title VARCHAR(255) PRIMARY KEY,
    -- picture ???
    date_of_release TEXT,
    description TEXT,
    rating NUMERIC
);
