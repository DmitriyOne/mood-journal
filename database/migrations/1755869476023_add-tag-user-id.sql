-- Up Migration
ALTER TABLE tags ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Down Migration
ALTER TABLE tags DROP COLUMN user_id;
