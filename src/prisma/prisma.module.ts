import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Isso permite que outros módulos usem o PrismaService
})
export class PrismaModule {}