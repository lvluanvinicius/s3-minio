interface DownloadFile {
  file_id: string;
}

export async function downloadFile({ file_id }: DownloadFile) {
  const response = await fetch(`/api/files/download?file_id=${file_id}`, {
    headers: {
      Accept: "application/octet-stream",
    },
  });

  // Verifique se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error("Erro ao baixar o arquivo.");
  }

  // Obtenha os dados como Blob (binário)
  const blob = await response.blob();

  // Crie uma URL para o blob
  const url = window.URL.createObjectURL(blob);

  // Crie um link temporário para baixar o arquivo
  const link = document.createElement("a");
  link.href = url;

  // Defina o nome do arquivo a partir do cabeçalho Content-Disposition, se disponível
  const contentDisposition = response.headers.get("Content-Disposition");
  let fileName = "downloaded_file";

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match && match[1]) {
      fileName = match[1];
    }
  }

  link.setAttribute("download", fileName); // Defina o nome do arquivo
  document.body.appendChild(link);
  link.click(); // Simule o clique no link para iniciar o download
  document.body.removeChild(link); // Remova o link temporário

  return true;
}
