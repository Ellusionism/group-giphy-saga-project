CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR,
	"title" VARCHAR,
	"category_id" INT REFERENCES "category" 
	
);


INSERT INTO "likes" ("url", "title") 
VALUES ('https://media2.giphy.com/media/IsiP1Q7ANM8Q10HHKU/200.gif?cid=a4aca14didgm9rs4d08frlsulbzlfjnv4a56xbtcz0u0uhk0&rid=200.gif&ct=g','Travel Beach GIF by Rome & Duddy');