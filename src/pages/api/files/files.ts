import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function files(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate, folder_id, search } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    const skip = (setPage - 1) * perPage;
    const searchString = search ? (search as string) : "";

    // Decrypt the folder ID, if necessary
    const folderId = folder_id ? (folder_id as string) : null;

    // 1. List folders (based on folder_id or root if null) with search applied
    const totalFolders = await prisma.folders.count({
      where: {
        folder_id: folderId, // Filter by parent folder or root
        folder_name: {
          contains: searchString, // Search by folder name
        },
      },
    });

    const folders = await prisma.folders.findMany({
      where: {
        folder_id: folderId, // Filter by parent folder or root
        folder_name: {
          contains: searchString, // Search by folder name
        },
      },
      skip: skip,
      take: perPage, // Adjust pagination
      select: {
        id: true,
        folder_name: true,
        created_at: true,
        _count: {
          select: {
            Files: true,
          },
        },
      },
      orderBy: {
        folder_name: "asc", // Always order folders alphabetically
      },
    });

    // 2. List files (based on folder_id or root if null) with search applied
    const totalFiles = await prisma.files.count({
      where: {
        folder_id: folderId,
        file_name: {
          contains: searchString, // Search by file name
        },
      },
    });

    const remainingPaginationForFiles = perPage - folders.length; // Adjust pagination based on number of folders listed

    const files = await prisma.files.findMany({
      where: {
        folder_id: folderId,
        file_name: {
          contains: searchString,
        },
      },
      skip: Math.max(skip - totalFolders, 0), // Skip files after folders are paginated
      take: remainingPaginationForFiles, // Ensure we paginate only the remaining space after folders
      select: {
        id: true,
        file_name: true,
        file_size: true,
        file_hash: true,
        created_at: true,
      },
      orderBy: {
        file_name: "asc", // Always order files alphabetically after folders
      },
    });

    // 3. Merge folders and files into a single array, maintaining folder priority
    const combinedResults = [
      ...folders.map((folder) => ({
        type: "folder", // Distinguish folder entries
        id: folder.id,
        name: folder.folder_name,
        created_at: folder.created_at,
        file_count: folder._count.Files,
      })),
      ...files.map((file) => ({
        type: "file", // Distinguish file entries
        id: file.id,
        name: file.file_name,
        size: file.file_size,
        hash: file.file_hash,
        created_at: file.created_at,
      })),
    ];

    // 4. Return the results
    return res.status(200).json({
      status: true,
      message: "Listagem de pastas e arquivos bem-sucedida.",
      data: {
        total_records: totalFolders + totalFiles, // Total folders + files
        current_page: setPage,
        per_page: perPage,
        data: combinedResults,
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
