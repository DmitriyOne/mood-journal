-- Up Migration
ALTER TABLE users ADD COLUMN name VARCHAR(255) NOT NULL;

-- Down Migration
ALTER TABLE users DROP COLUMN IF EXISTS name;
