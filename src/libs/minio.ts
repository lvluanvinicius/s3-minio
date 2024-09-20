import { Client } from "minio";

// Configurando o cliente MinIO
const minioClient = new Client({
  endPoint: "191.37.38.78", // IP do servidor onde o MinIO está rodando
  port: 9000, // Porta do MinIO (API S3)
  useSSL: false, // Defina como true se estiver usando HTTPS
  accessKey: "cednet", // Seu MINIO_ROOT_USER
  secretKey: "@Bw37!Xy29%", // Sua MINIO_ROOT_PASSWORD
});

export { minioClient };
