import { minioClient } from "@/libs/minio";
import { Readable } from "stream";

// Função cria um novo bucket.
export async function createBucket({ bucket_name }: { bucket_name: string }) {
  const exists = await minioClient.bucketExists(bucket_name);

  // Valida se já existe.
  if (exists) {
    throw new Error(`O bucket ${bucket_name} já está em uso.`);
  }

  await minioClient.makeBucket(bucket_name);
}
