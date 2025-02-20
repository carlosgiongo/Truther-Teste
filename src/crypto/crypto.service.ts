import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { validateAxiosError, validatePrismaErrors } from 'src/validation.utils';

@Injectable()
export class CryptoService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async searchAllCoins(
    page: number = 1,
  ): Promise<Coin[] | BadRequestException> {
    try {
      const data = await firstValueFrom(
        this.httpService.get<Coin[]>(
          `${this.configService.get('COINGECKO_URL')}/coins/markets?vs_currency=brl&page=${page}`,
          {
            headers: {
              'x-cg-demo-api-key': this.configService.get(
                'COINGECKO_API',
              ) as string,
            },
          },
        ),
      );

      return data.data;
    } catch (error: unknown) {
      return validateAxiosError(
        'Erro na requisição de moedas. Valide se os parâmetros estão corretos',
        error,
      );
    }
  }

  async searchCoinById(
    id: string,
  ): Promise<SpecificCoin | BadRequestException> {
    try {
      const data = await firstValueFrom(
        this.httpService.get<SpecificCoin>(
          `${this.configService.get('COINGECKO_URL')}/coins/${id}`,
          {
            headers: {
              'x-cg-demo-api-key': this.configService.get(
                'COINGECKO_API',
              ) as string,
            },
          },
        ),
      );

      //-- Procurando a coin no prisma, se existir, atualiza, se não, cria
      const coin = await this.prisma.cryptoCoin.findUnique({
        where: {
          id: data.data.id,
        },
      });

      if (coin) {
        await validatePrismaErrors(
          this.prisma.cryptoCoin.update({
            where: {
              id: data.data.id,
            },
            data: {
              valorMercado: data.data.market_data.market_cap.brl,
              variacao24h: data.data.market_data.price_change_percentage_24h,
              variacao7d: data.data.market_data.price_change_percentage_7d,
              maiorValor: data.data.market_data.ath.brl,
              menorValor: data.data.market_data.atl.brl,
              precoAtual: data.data.market_data.current_price.brl,
            },
          }),
        );
      } else {
        await validatePrismaErrors(
          this.prisma.cryptoCoin.create({
            data: {
              id: data.data.id,
              valorMercado: data.data.market_data.market_cap.brl,
              variacao24h: data.data.market_data.price_change_percentage_24h,
              variacao7d: data.data.market_data.price_change_percentage_7d,
              maiorValor: data.data.market_data.ath.brl,
              menorValor: data.data.market_data.atl.brl,
              precoAtual: data.data.market_data.current_price.brl,
            },
          }),
        );
      }

      return data.data;
    } catch (error: unknown) {
      return validateAxiosError(
        'Erro na requisição de moedas. Valide se os parâmetros estão corretos',
        error,
      );
    }
  }
}
