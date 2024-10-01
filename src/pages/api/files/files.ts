import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface FullData {
  item_name: string;
  item_id: string;
  item_type: "file" | "folder";
  item_size: number | null;
  item_total_files: number | null;
  item_created_at: Date | null;
  item_updated_at: Date | null;
  item_owner: string;
  item_folder_id: string | null;
}

export async function files(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate, folder_id, search } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    const skip = (setPage - 1) * perPage;
    const searchString = search ? (search as string) : "";

    // Decrypt the folder ID, if necessary
    const folderId = folder_id ? (folder_id as string) : null;

    // Recuperando total de Arquivos e Pastas.
    const totalFolders = await prisma.folders.count({});
    const totalFiles = await prisma.files.count({});

    // Pegando total de páginas.
    const pages = Math.ceil((totalFolders + totalFiles) / perPage);

    // Recupera as pastas.
    const folders = await prisma.folders.findMany({
      skip,
      take: perPage,
      where: {
        folder_id: folderId,
        folder_name: {
          contains: searchString,
        },
      },
      select: {
        id: true,
        folder_name: true,
        folder_id: true,
        updated_at: true,
        created_at: true,

        User: {
          select: {
            username: true,
          },
        },

        _count: {
          select: {
            Files: true,
          },
        },
      },
      orderBy: {
        folder_name: "asc",
      },
    });

    // Recupera os arquivos.
    const files = await prisma.files.findMany({
      skip,
      take: perPage - folders.length,
      select: {
        id: true,
        file_name: true,
        file_size: true,
        updated_at: true,
        created_at: true,

        User: {
          select: {
            username: true,
          },
        },
      },
      where: {
        folder_id: {
          equals: folderId,
        },
        file_name: {
          contains: searchString,
        },
      },
      orderBy: {
        file_name: "asc",
      },
    });

    const fullData = [] as FullData[];

    folders.map((folder) => {
      fullData.push({
        item_id: folder.id,
        item_name: folder.folder_name,
        item_type: "folder",
        item_created_at: folder.created_at,
        item_updated_at: folder.updated_at,
        item_size: null,
        item_total_files: folder._count.Files,
        item_owner: `@${folder.User.username}`,
        item_folder_id: folder.folder_id,
      });
    });

    files.map((file) => {
      fullData.push({
        item_id: file.id,
        item_name: file.file_name,
        item_type: "file",
        item_created_at: file.created_at,
        item_updated_at: file.updated_at,
        item_size: file.file_size,
        item_total_files: null,
        item_owner: `@${file.User.username}`,
        item_folder_id: null,
      });
    });

    return res.status(200).json({
      status: true,
      message: "Pastas e arquivos recuperados com sucesso.",
      data: {
        per_page: perPage,
        total_page: folders.length + files.length,
        current_page: setPage,
        total: totalFolders + totalFiles,
        pages,
        data: {
          total_folders: totalFolders,
          total_files: totalFiles,
          result: fullData,
        },
      },
    });
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
}
