import { Module } from '@nestjs/common';
import { BarbeirosService } from './barbeiros.service';
import { BarbeirosController } from './barbeiros.controller';
import { PrismaModule } from '../prisma/prisma.module';// 1. Importamos o PrismaModule

@Module({
  imports: [PrismaModule], 
  controllers: [BarbeirosController],
  providers: [BarbeirosService],
})
export class BarbeirosModule {}