-- Up Migration
CREATE TRIGGER new_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER new_updated_at_tags
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER new_updated_at_journal_entities
BEFORE UPDATE ON journal_entities
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Down Migration
DROP TRIGGER IF EXISTS new_updated_at_users ON users;
DROP TRIGGER IF EXISTS new_updated_at_tags ON tags;
DROP TRIGGER IF EXISTS new_updated_at_journal_entities ON journal_entities;
