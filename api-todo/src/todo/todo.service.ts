import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CTodos } from 'src/shared/entities/TodoList';
import { Like, Repository } from 'typeorm';
import { AllQueryParams } from 'src/shared/dtos/QueryParams';
import { applyFilters } from 'src/utils/filters';
import { PaginacionResponseDTO } from 'src/shared/dtos/PaginacionDTO';
import { TodoResponseDto } from 'src/shared/dtos/TodoResponse';
import { SuccessResponse } from 'src/shared/dtos/success-response.dto';
import { EstatusTodo } from 'src/enums/TodoEnum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(CTodos)
    private readonly todoRepository: Repository<CTodos>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const context = `${TodoService.name} | crear TODO`;

    try {
      const newTodo = this.todoRepository.create({
        ...createTodoDto,
        todoFechaCreacion: new Date(),
        todoFechaActualizacion: new Date(),
        todoFechaEliminacion: null,
        estatus: EstatusTodo.POR_HACER,
      });

      const savedTodo = await this.todoRepository.save(newTodo);

      const todoToDto = new TodoResponseDto(savedTodo);

      this.logger.log(
        `TODO creado exitosamente con ID: ${savedTodo.todoId}`,
        `${context} | ÉXITO`,
      );

      return new SuccessResponse<TodoResponseDto>(
        todoToDto,
        `TODO con ID ${savedTodo.todoId} creado exitosamente`,
        201,
        'CREATED',
      );
    } catch (error) {
      this.logger.error(
        'Error al crear el TODO',
        error.stack,
        `${context} | ERROR`,
      );
      throw error;
    }
  }

  async findAll(
    params: AllQueryParams,
  ): Promise<SuccessResponse<TodoResponseDto[]>> {
    const context = `${TodoService.name} | Encontrar los Todos conforme a los params`;
    try {
      const { pagina, limite, todoTitulo, todoDescripcion } = params;
      const where: any = {};
      const filtersMap = {
        todoTitulo: {
          value: todoTitulo,
          apply: (value: string) => Like(`%${value}%`),
          logMessage: `titulo del Todo = ${todoTitulo}`,
        },
        todoDescripcion: {
          value: todoDescripcion,
          apply: (value: string) => Like(`%${value}%`),
          logMessage: `descripcion del Todo = ${todoDescripcion}`,
        },
      };
      const whereFilter = applyFilters(filtersMap, where, this.logger, context);
      const offset = (pagina - 1) * limite;
      console.log(whereFilter, "XXXXXX")
      const [todos, totalItems] = await this.todoRepository.findAndCount({
        where: {...whereFilter, registroActivo: true},
        skip: offset,
        take: limite,
        order: { todoId: 'ASC'}
      });

      const pagination: PaginacionResponseDTO = {
        currentPage: pagina,
        totalPages: Math.ceil(totalItems / limite),
        totalItems: totalItems,
        limit: limite,
        offset: offset,
      };

      const todosToDto = todos.map((todo) => new TodoResponseDto(todo));

      return new SuccessResponse<TodoResponseDto[]>(
        todosToDto,
        `${todos.length} TODO encontrados`,
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      this.logger.error(
        `Error al buscar TODOs con parámetros: ${JSON.stringify({})} - Error: ${error.message}`,
        error.stack,
        `${context} | ERROR`,
      );
    }
  }

  async findOne(id: number): Promise<SuccessResponse<TodoResponseDto>> {
    const context = `${TodoService.name} | obtener TODO`;

    try {
      const existingTodo = await this.todoRepository.findOne({
        where: { todoId: id, registroActivo: true },
      });

      if (!existingTodo) {
        const notFoundMessage = `TODO con ID [${id}] no encontrado o está desactivado`;
        this.logger.warn(notFoundMessage, `${context} | NO ENCONTRADO`);
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          description: notFoundMessage,
          statusText: 'False',
        });
      }
      const todoToDto = new TodoResponseDto(existingTodo);
      this.logger.log(
        `TODO encontrado con ID: ${existingTodo.todoId}`,
        `${context} | ÉXITO`,
      );
      return new SuccessResponse<TodoResponseDto>(
        todoToDto,
        `TODO con ID ${existingTodo.todoId} encontrado exitosamente`,
        200,
        'OK',
      );
    } catch (error) {
      this.logger.error(
        'Error al obtener el TODO',
        error.stack,
        `${context} | ERROR`,
      );
      throw error;
    }
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<SuccessResponse<TodoResponseDto>> {
    const context = `${TodoService.name} | actualizar TODO`;
    try {
      const existingTodo: CTodos = await this.todoRepository.findOne({
        where: { todoId: id, registroActivo: true },
      });

      if (!existingTodo) {
        const conflictMessage = `TODO no existe con el ID [${existingTodo.todoId}]`;
        this.logger.warn(conflictMessage, `${context} | CONFLICTO`);

        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          description: conflictMessage,
          statusText: 'False',
        });
      }

      existingTodo.todoTitulo =
        updateTodoDto.todoTitulo || existingTodo.todoTitulo;
      existingTodo.todoDescripcion =
        updateTodoDto.todoDescripcion || existingTodo.todoDescripcion;
      existingTodo.estatus = updateTodoDto.estatus || existingTodo.estatus;
      existingTodo.todoFechaActualizacion = new Date();

      console.log(existingTodo, "UPDATE")

      const updatedTodo = await this.todoRepository.save(existingTodo);
      const todoToDto = new TodoResponseDto(updatedTodo);

      this.logger.log(
        `TODO actualizado exitosamente con ID: ${updatedTodo.todoId}`,
        `${context} | ÉXITO`,
      );
      return new SuccessResponse<TodoResponseDto>(
        todoToDto,
        `TODO con ID ${updatedTodo.todoId} actualizado exitosamente`,
        200,
        'OK',
      );
    } catch (error) {
      this.logger.error(
        'Error al actualizar el TODO',
        error.stack,
        `${context} | ERROR`,
      );
      throw error;
    }
  }

  async remove(id: number): Promise<{
    data: any;
    description: string;
    statusCode: number;
    statusText: string;
  }> {
    const context = `${TodoService.name} | eliminación Lógica`;
    this.logger.log(
      `Iniciando eliminación lógica del TODO con ID: ${id}`,
      `${context} | INICIO`,
    );

    try {
      this.logger.debug(
        `Buscando TODO con ID: ${id} para eliminación lógica`,
        `${context} | BÚSQUEDA`,
      );
      const todo = await this.todoRepository.findOne({
        where: { todoId: id, registroActivo: true },
      });

      if (!todo) {
        this.logger.warn(
          `TODO con ID ${id} no encontrado o ya está inactivo`,
          `${context} | NO ENCONTRADA`,
        );
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          description: `El TODO con ID ${id} no existe o ya está inactivo.`,
          statusText: 'False',
        });
      }

      todo.registroActivo = false;
      todo.todoFechaEliminacion = new Date();

      this.logger.debug(
        `Marcando el TODO con ID: ${id} como inactivo`,
        `${context} | ACTUALIZACIÓN`,
      );

      console.log(todo, "TODO a eliminar")
      await this.todoRepository.save(todo);

      this.logger.log(
        `TODO con ID: ${id} eliminado lógicamente con éxito`,
        `${context} | ÉXITO`,
      );

      return {
        data: null,
        description: `TODO con ID ${id} eliminado exitosamente (eliminación lógica)`,
        statusCode: 200,
        statusText: 'OK',
      };
    } catch (error) {
      this.logger.error(
        `Error al realizar la eliminación lógica de la habitacion con ID ${id}: ${error.message}`,
        error.stack,
        `${context} | ERROR`,
      );
    }
  }
}
