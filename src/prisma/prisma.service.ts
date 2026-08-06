import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';


//flag injectable mostra que essa classe pode ser utilizada em outros locais
@Injectable()
//prisma Service é filho do prisma Client(lib do prisma)-->isso faz herdar todas as funções famosas(findmany,create)
export class PrismaService extends PrismaClient implements OnModuleInit {
  //implements vai puxar o OnModuleInit quando a classe for iniciada
  constructor() {
    //cria o tradutor para o banco de dados
    const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
    
   
    super({ adapter });
  }

  async onModuleInit() {
    // Conecta no banco de dados quando o módulo iniciar
    await this.$connect();
  }
}
