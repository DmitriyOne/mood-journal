-- Up Migration
CREATE TABLE journal_entities (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  mood NUMERIC NOT NULL CHECK (mood BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Down Migration
DROP TABLE IF EXISTS journal_entities;
