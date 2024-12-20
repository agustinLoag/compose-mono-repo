
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as apiTodoOperations from "../todo/swagger/todo.swagger"
import { ApiTags } from '@nestjs/swagger';
import { AllQueryParams } from 'src/shared/dtos/QueryParams';

@ApiTags('TODOs')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @apiTodoOperations.create()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @apiTodoOperations.findAll()
  async findAll(@Query() params: AllQueryParams) {
    return this.todoService.findAll(params);
  }

  @Get(':id')
  @apiTodoOperations.findOne()
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @apiTodoOperations.update()
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @apiTodoOperations.softDelete()
  async remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}

