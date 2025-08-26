import { config } from 'dotenv';
import { Pool, PoolConfig } from 'pg';
import { TTag, TUser, TJournalEntity, TJournalEntityTag } from './types';

config({ path: '.env.db' });

console.log(process.env);

const pgConfig: PoolConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
};

const pool = new Pool(pgConfig);

const seedDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ADD USERS
    const usersQuery = await client.query<TUser>(
      `INSERT INTO users (name, email, password) VALUES  ($1, $2, $3), ($4, $5, $6) RETURNING *`,
      [
        'John Doe',
        'john@yahoo.com',
        'password123',
        'Sweet Doe',
        'sweet@gmail.com',
        'password321',
      ],
    );

    const userIds = usersQuery.rows.map((user) => user.id);

    // ADD JOURNAL ENTRIES
    const journalEntityQuery = await client.query<TJournalEntity>(
      `INSERT INTO journal_entities (user_id, title, description, mood) VALUES ($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12), ($13, $14, $15, $16) RETURNING *`,
      [
        userIds[0],
        'The First Post',
        'This is a first journal entry.',
        8,
        userIds[1],
        'The Second Post',
        'This is a second journal entry.',
        7,
        userIds[1],
        'The Third Post',
        'This is a third journal entry.',
        5,
        userIds[0],
        'The Fourth Post',
        'This is a fourth journal entry.',
        6,
      ],
    );

    const journalEntityIds = journalEntityQuery.rows.map((entry) => entry.id);

    // ADD TAGS
    const tags = await client.query<TTag>(
      `INSERT INTO tags (name, user_id) VALUES ($1, $2),  ($3, $4), ($5, $6) RETURNING *`,
      ['Tag 1', userIds[0], 'Tag 2', userIds[1], 'Tag 3', userIds[0]],
    );

    const tagIds = tags.rows.map((tag) => tag.id);

    // BOTH JOURNAL ENTRIES AND TAGS
    const journalEntitiesAndTags = await client.query<TJournalEntityTag>(
      `INSERT INTO journal_entities_tags (journal_entity_id, tag_id) VALUES ($1, $2), ($3, $4), ($5, $6) RETURNING *`,
      [
        journalEntityIds[0],
        tagIds[0],
        journalEntityIds[1],
        tagIds[1],
        journalEntityIds[2],
        tagIds[2],
      ],
    );

    console.group('Seeding Results');
    console.log('USERS: ', usersQuery.rows);
    console.log('JOURNAL ENTRIES: ', journalEntityQuery.rows);
    console.log('TAGS: ', tags.rows);
    console.log('JOURNAL_ENTITIES_TAGS: ', journalEntitiesAndTags.rows);
    console.groupEnd();

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
  } finally {
    client.release();
  }
};

seedDatabase()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => pool.end());
