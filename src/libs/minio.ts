import { Client } from 'minio'
import { prisma } from './prisma'

interface ConfigInterface {
  [key: string]: string
}

async function getConfig(): Promise<Client> {
  // Tipagem para a configuração com chave/valor do tipo string
  const useConfig: ConfigInterface = {}

  // Recuperando configurações.
  const config = await prisma.s3Config.findMany({})

  // Recuperando configurações.
  for await (const cnf of config) {
    useConfig[cnf.name] = cnf.value
  }

  // Recupera a porta e converte em inteiro.
  const port = parseInt(useConfig.console_port || '9000')

  // Criando conexão com o S3.
  const minioClient = new Client({
    endPoint: useConfig.api_url.replace('https://', ''),
    port,
    useSSL: Boolean(useConfig.use_ssl || 'false'),
    accessKey: useConfig.sdk_console_username,
    secretKey: useConfig.sdk_console_password,
  })

  await prisma.$disconnect()

  return minioClient
}

async function minioMain() {
  return getConfig()
}

export { minioMain }
