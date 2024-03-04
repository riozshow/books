import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAll() {
    return this.authorsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.authorsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() body: CreateAuthorDTO) {
    return this.authorsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  udpate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAuthorDTO,
  ) {
    return this.authorsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authorsService.delete(id);
  }
}
