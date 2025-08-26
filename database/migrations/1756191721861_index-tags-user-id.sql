-- Up Migration
CREATE INDEX idx_tags_user_id ON tags(user_id);

-- Down Migration
DROP INDEX idx_tags_user_id ON tags;
