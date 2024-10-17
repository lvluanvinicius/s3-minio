declare interface DisplayCounts {
  total_folders: number;
  total_file_size: number;
  total_files: number;
  histories: {
    upload: number;
    download: number;
  };
}
