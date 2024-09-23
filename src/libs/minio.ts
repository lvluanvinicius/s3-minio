import { Client } from "minio";

const s3User = process.env.S3_APP_USERNAME as string;
const s3Pass = process.env.S3_APP_PASSWORD as string;

// Configurando o cliente MinIO
const minioClient = new Client({
  endPoint: "191.37.38.78", // IP do servidor onde o MinIO está rodando
  port: 9000, // Porta do MinIO (API S3)
  useSSL: false, // Defina como true se estiver usando HTTPS
  accessKey: s3User, // Seu MINIO_ROOT_USER
  secretKey: s3Pass, // Sua MINIO_ROOT_PASSWORD
});

export { minioClient };
