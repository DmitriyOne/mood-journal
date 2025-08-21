-- Up Migration
CREATE TABLE journal_entities_tags (
  journal_entity_id INT NOT NULL REFERENCES journal_entities(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (journal_entity_id, tag_id)
)

-- Down Migration
DROP TABLE IF EXISTS journal_entities_tags;
