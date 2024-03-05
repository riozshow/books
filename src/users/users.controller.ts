import {
  Controller,
  Get,
  Delete,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getById(id);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteById(id);
  }
}
