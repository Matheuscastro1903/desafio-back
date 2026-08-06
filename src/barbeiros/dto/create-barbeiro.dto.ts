import { ApiProperty } from '@nestjs/swagger';

export class CreateBarbeiroDto {
  @ApiProperty({
    example: 'Beto Barbeiro',
    description: 'O nome do profissional'
  })
  nome!: string;

  @ApiProperty({
    example: 'Corte Degradê e Barba Lenhador',
    description: 'A especialidade principal do barbeiro'
  })
  especialidade!: string;
}