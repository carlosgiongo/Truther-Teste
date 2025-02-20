-- CreateTable
CREATE TABLE "CryptoCoin" (
    "id" SERIAL NOT NULL,
    "valorMercado" DOUBLE PRECISION,
    "variacao24h" DOUBLE PRECISION,
    "variacao7d" DOUBLE PRECISION,
    "maiorValor" DOUBLE PRECISION,
    "menorValor" DOUBLE PRECISION,
    "precoAtual" DOUBLE PRECISION,

    CONSTRAINT "CryptoCoin_pkey" PRIMARY KEY ("id")
);
