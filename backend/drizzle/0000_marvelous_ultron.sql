CREATE TABLE "kanbans" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"profile" text NOT NULL
);
