import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

@Module({
  exports: [CryptoModule],
  controllers: [CryptoController],
  providers: [CryptoService],
  imports: [PrismaModule, HttpModule],
})
export class CryptoModule {}
