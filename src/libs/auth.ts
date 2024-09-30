import { FetchError, get } from "@/services/app";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function isAuthenticated(
  cookies: Partial<{
    [key: string]: string;
  }>,
) {
  try {
    for (let index in cookies) {
      if (index === "_s3_minio_app.webtoken") {
        const response = await get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user`,
          {
            headers: {
              Accept: "application/json",
              cookie: `${index}=${cookies[index]}`,
            },
          },
        );

        return response.status;
      }

      throw new Error("Index de sessão não encontrado.");
    }

    throw new Error(
      "Houve um erro inesperado ao receber os valores dos cookies de sessão.",
    );
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        return false;
      }

      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Houve um erro inesperado ao tentar validar a sessão.");
  }
}
