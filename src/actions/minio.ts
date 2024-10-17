import { minioMain } from '@/libs/minio'

// Função cria um novo bucket.
export async function createBucket({ bucket_name }: { bucket_name: string }) {
  const minioClient = await minioMain()
  const exists = await minioClient.bucketExists(bucket_name)

  // Valida se já existe.
  if (exists) {
    throw new Error(`O bucket ${bucket_name} já está em uso.`)
  }

  await minioClient.makeBucket(bucket_name)
}

// Função efetua a exclusão do arquivo dentro do S3.
export async function destroyObject({
  bucket_name,
  file_name,
}: {
  bucket_name: string
  file_name: string
}) {
  const minioClient = await minioMain()
  // Efetuando exclusão.
  await minioClient.removeObject(bucket_name, file_name)
}
