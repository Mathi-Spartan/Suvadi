CREATE TABLE sections (key text PRIMARY KEY, position int NOT NULL, name_ta text NOT NULL, name_en text NOT NULL);
CREATE TABLE books (
  id int PRIMARY KEY, pm_no int NOT NULL, title text NOT NULL, author text NOT NULL DEFAULT '', genre text NOT NULL DEFAULT '',
  section text NOT NULL REFERENCES sections(key), pdf_ids text[] NOT NULL DEFAULT '{}', unicode_ids text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX books_section_idx ON books(section);
CREATE INDEX books_pm_no_idx ON books(pm_no);
