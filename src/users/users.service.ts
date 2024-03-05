import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Password, User } from '@prisma/client';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  public getAll(): Promise<User[]> {
    return this.db.user.findMany({
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  public async getById(id: User['id']): Promise<User | void> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  public async getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | void> {
    const user = await this.db.user.findUnique({
      where: { email },
      include: { password: true },
    });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  public async create(body: CreateUserDTO): Promise<User | void> {
    try {
      const { password, ...userData } = body;
      return await this.db.user.create({
        data: {
          ...userData,
          password: { create: { hashedPassword: password } },
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException('Email is already registered');
      }
    }
  }

  public async updateById(
    id: User['id'],
    body: UpdateUserDTO,
  ): Promise<User | void> {
    try {
      const { password, ...userData } = body;
      if (password) {
        return await this.db.user.update({
          where: { id },
          data: {
            ...userData,
            password: { create: { hashedPassword: password } },
          },
        });
      } else {
        return await this.db.user.update({
          where: { id },
          data: userData,
        });
      }
    } catch (err) {
      if (err.code === 'P2025')
        throw new NotFoundException("User doesn't exist");
      if (err.code === 'P2002')
        throw new BadRequestException('Email is already taken');
    }
  }

  public async deleteById(id: User['id']) {
    if (!(await this.getById(id))) {
      throw new NotFoundException("User doesn't exist");
    }
    return this.db.user.delete({ where: { id } });
  }
}
