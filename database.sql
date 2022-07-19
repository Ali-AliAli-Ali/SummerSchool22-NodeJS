create TABLE Administrator(
    admin_token TEXT PRIMARY KEY
);

create TABLE Poster(
    title TEXT PRIMARY KEY,
    -- picture ???
    date_of_release DATE,
    description TEXT,
    rating NUMERIC
);

create TABLE User(
);