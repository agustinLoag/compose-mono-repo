import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from 'src/shared/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([...Entities]), 
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
