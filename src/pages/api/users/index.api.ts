import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { NextApiRequest, NextApiResponse } from "next";
import { users } from "./users";
import { update } from "./update";
import { apiAuth } from "@/middlewares/api-auth";
import { prisma } from "@/libs/prisma";
import { destroy } from "./destroy";
import { store } from "./store";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      return users(req, res);
    } else if (req.method === "POST") {
      return store(req, res);
    } else if (req.method === "PUT") {
      return update(req, res);
    } else if (req.method === "DELETE") {
      return destroy(req, res);
    } else {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    // Recuperando dados de usuários.
  } catch (error) {
    if (error instanceof Error) {
      return apiHandlerErros(error, res);
    }

    return res.status(400).json({
      status: false,
      message: "Erro desconhecido.",
      data: null,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default apiAuth(handler);
