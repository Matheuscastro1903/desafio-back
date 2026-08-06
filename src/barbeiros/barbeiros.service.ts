import { Injectable } from '@nestjs/common';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
import { PrismaService } from '../prisma/prisma.service'; // Importando o Prisma

@Injectable()
export class BarbeirosService {
  // Injeção de dependência do nosso PrismaService
  constructor(private prisma: PrismaService) {}

  create(createBarbeiroDto: CreateBarbeiroDto) {
    return this.prisma.barbeiro.create({
      data: createBarbeiroDto,
    });
  }

  findAll() {
    return this.prisma.barbeiro.findMany();
  }

  findOne(id: string) {
    return this.prisma.barbeiro.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBarbeiroDto: UpdateBarbeiroDto) {
    return this.prisma.barbeiro.update({
      where: { id },
      data: updateBarbeiroDto,
    });
  }

  remove(id: string) {
    return this.prisma.barbeiro.delete({
      where: { id },
    });
  }
}