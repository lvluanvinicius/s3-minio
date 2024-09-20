declare interface FileObject {
  name: string;
  etag: string;
  size: number;
  lastModified: Date;
  preview?: string;
}
