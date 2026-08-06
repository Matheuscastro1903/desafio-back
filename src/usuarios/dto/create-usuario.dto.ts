import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Matheus Silva',
    description: 'O nome completo do cliente da barbearia'
  })
  nome!: string;

  @ApiProperty({
    example: 'matheus.silva@email.com',
    description: 'O e-mail de contato do cliente'
  })
  email!: string;
}