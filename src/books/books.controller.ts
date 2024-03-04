import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() body: CreateBookDTO) {
    return this.booksService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  udpate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBookDTO,
  ) {
    return this.booksService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.delete(id);
  }
}
