import { ApiProperty } from '@nestjs/swagger';

export class CreateEventoDto {
  @ApiProperty({
    example: '2026-08-15T14:00:00Z',
    description: 'Data e hora de início (formato ISO 8601)'
  })
  startTime!: string;

  @ApiProperty({
    example: '2026-08-15T14:30:00Z',
    description: 'Data e hora de fim (formato ISO 8601)'
  })
  endTime!: string;

  @ApiProperty({ example:'2427baf8-7f91-4e3c-9f63-0d203cacd755',description: 'ID do cliente registado' })
  usuarioId!: string;

  @ApiProperty({example:'9f66736a-658d-4409-8271-e686298a740b',description: 'ID do barbeiro registado' })
  barbeiroId!: string;
}