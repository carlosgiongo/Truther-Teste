import { Controller, Get, Query, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  searchAllCoins(@Query('page') page: string = '1') {
    return this.cryptoService.searchAllCoins(parseInt(page));
  }

  @Get(':id')
  searchCoinById(@Param('id') id: string) {
    return this.cryptoService.searchCoinById(id);
  }
}
