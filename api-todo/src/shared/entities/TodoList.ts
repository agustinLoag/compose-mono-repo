import { EstatusTodo } from 'src/enums/TodoEnum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';



@Index('PK_c_todos', ['todoId'], { unique: true })
@Entity('c_todos')
export class CTodos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'todo_id' })
  todoId: number;

  @Column('varchar', { name: 'todo_titulo', length: 50 })
  todoTitulo: string;

  @Column('varchar', { name: 'todo_descripcion', length: 250 })
  todoDescripcion: string;

  @Column('timestamp', {
    name: 'todo_fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  todoFechaCreacion: Date;

  @Column('timestamp', {
    name: 'todo_fecha_actualizacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  todoFechaActualizacion: Date;

  @Column('timestamp', { name: 'todo_fecha_eliminacion', nullable: true })
  todoFechaEliminacion: Date | null;

  @Column('boolean', { name: 'registro_activo', default: true})
  registroActivo: boolean;

  @Column({
    type: 'enum',
    enum: EstatusTodo,
    default: EstatusTodo.POR_HACER
  })
  estatus: EstatusTodo;
}
