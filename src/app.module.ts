import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosModule } from './eventos/eventos.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BarbeirosModule } from './barbeiros/barbeiros.module';


@Module({
  imports: [EventosModule, PrismaModule, UsuariosModule, BarbeirosModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}