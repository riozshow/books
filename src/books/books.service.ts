import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private db: PrismaService) {}

  public getAll(): Promise<Book[]> {
    return this.db.book.findMany();
  }

  public async getById(id: Book['id']): Promise<Book | void> {
    const book = await this.db.book.findUnique({ where: { id } });
    if (book) return book;
    throw new NotFoundException('Book not found');
  }

  public async create(body: CreateBookDTO): Promise<Book | void> {
    try {
      const { authorId, ...bookData } = body;
      return await this.db.book.create({
        data: {
          ...bookData,
          author: { connect: { id: authorId } },
        },
      });
    } catch (err) {
      if (err.code === 'P2025')
        throw new BadRequestException("Author doesn't exist");
      if (err.code === 'P2002')
        throw new BadRequestException('Book name is already exists');
    }
  }

  public async update(
    id: Book['id'],
    body: UpdateBookDTO,
  ): Promise<Book | void> {
    if (!(await this.getById(id)))
      throw new NotFoundException('Book not found');
    try {
      const { authorId, ...bookData } = body;
      return await this.db.book.update({
        where: { id },
        data: {
          ...bookData,
          author: { connect: { id: authorId } },
        },
      });
    } catch (err) {
      if (err.code === 'P2025')
        throw new BadRequestException("Author doesn't exist");
      if (err.code === 'P2002')
        throw new BadRequestException('Book name is already exists');
    }
  }

  public async delete(id: Book['id']): Promise<Book | void> {
    if (!(await this.getById(id)))
      throw new NotFoundException('book not found');
    return this.db.book.delete({ where: { id } });
  }
}
