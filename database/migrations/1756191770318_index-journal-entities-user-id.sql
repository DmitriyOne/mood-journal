-- Up Migration
CREATE INDEX idx_journal_entities_user_id ON journal_entities(user_id);

-- Down Migration
DROP INDEX idx_journal_entities_user_id ON journal_entities;
