import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DatabaseService } from '../database/database.service';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private dbService: DatabaseService) {}

  create(createTagDto: CreateTagDto) {
    return this.dbService.queryOne<Tag>(
      'INSERT INTO tags (name) VALUES ($1) RETURNING *',
      [createTagDto.name],
    );
  }

  findAll() {
    return this.dbService.queryRows<Tag>('SELECT * FROM tags');
  }

  async findOne(id: number) {
    const tag = await this.dbService.queryOne<Tag>(
      'SELECT * FROM tags WHERE id = $1',
      [id],
    );

    if (!tag) throw new NotFoundException(`Tag with id ${id} not found`);

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    // TODO: add check for user id
    const tag = await this.dbService.queryOne<Tag>(
      'UPDATE tags SET name = $1 WHERE id = $2 RETURNING *',
      [updateTagDto.name, id],
    );

    if (!tag) throw new NotFoundException(`Tag with id ${id} not found`);

    return tag;
  }

  async remove(id: number) {
    // TODO: add check for user id
    const tag = await this.dbService.queryOne<Tag>(
      'DELETE FROM tags WHERE id = $1 RETURNING *',
      [id],
    );

    if (!tag) throw new NotFoundException(`Tag with id ${id} not found`);

    return tag;
  }
}
