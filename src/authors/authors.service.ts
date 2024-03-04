import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author } from '@prisma/client';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private db: PrismaService) {}

  public getAll(): Promise<Author[]> {
    return this.db.author.findMany();
  }

  public async getById(id: Author['id']): Promise<Author | void> {
    const author = await this.db.author.findUnique({ where: { id } });
    if (author) return author;
    throw new NotFoundException('Author not found');
  }

  public async create(body: CreateAuthorDTO): Promise<Author | void> {
    try {
      return await this.db.author.create({ data: body });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException('Author name is already exist');
      }
    }
  }

  public async update(
    id: Author['id'],
    body: UpdateAuthorDTO,
  ): Promise<Author | void> {
    if (!(await this.getById(id)))
      throw new NotFoundException('Author not found');
    if (await this.db.author.findUnique({ where: { name: body.name } }))
      throw new ConflictException('Author name is already exist');
    return this.db.author.update({ where: { id }, data: body });
  }

  public async delete(id: Author['id']): Promise<Author | void> {
    if (!(await this.getById(id)))
      throw new NotFoundException('Author not found');
    return this.db.author.delete({ where: { id } });
  }
}
