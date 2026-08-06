import { Injectable,ConflictException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      //Tenta salvar o usuário no banco
      return await this.prisma.usuario.create({
        data: createUsuarioDto,
      });
    } catch (error: any) {
      //O código 'P2002' é o erro padrão do Prisma para "Unique constraint failed"
      if (error.code === 'P2002') {
        throw new ConflictException('Este e-mail já está cadastrado na nossa barbearia!');
      }
      
     
      throw error;
    }
  }
  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  remove(id: string) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}