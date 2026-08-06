import { Injectable, ConflictException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) {}

  async create(createEventoDto: CreateEventoDto) {
    const novoInicio = new Date(createEventoDto.startTime);
    const novoFim = new Date(createEventoDto.endTime);

    //cd Validação de conflito de horário para o mesmo barbeiro
    const eventoConflitante = await this.prisma.evento.findFirst({
      where: {
        barbeiroId: createEventoDto.barbeiroId,
        startTime: { lt: novoFim },
        endTime: { gt: novoInicio },
      },
    });

    if (eventoConflitante) {
      throw new ConflictException('O barbeiro já possui um agendamento conflitante para este horário!');
    }

    return await this.prisma.evento.create({
      data: {
        startTime: novoInicio,
        endTime: novoFim,
        usuarioId: createEventoDto.usuarioId,
        barbeiroId: createEventoDto.barbeiroId,
      },
    });
  }

  findAll() {
    return this.prisma.evento.findMany({
      include: { usuario: true, barbeiro: true }
    });
  }

  findOne(id: string) {
    return this.prisma.evento.findUnique({
      where: { id },
      include: { usuario: true, barbeiro: true }
    });
  }

  update(id: string, updateEventoDto: UpdateEventoDto) {
    return this.prisma.evento.update({
      where: { id },
      data: {
        startTime: updateEventoDto.startTime ? new Date(updateEventoDto.startTime) : undefined,
        endTime: updateEventoDto.endTime ? new Date(updateEventoDto.endTime) : undefined,
        usuarioId: updateEventoDto.usuarioId,
        barbeiroId: updateEventoDto.barbeiroId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.evento.delete({
      where: { id },
    });
  }
}