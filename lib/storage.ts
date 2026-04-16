import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? "/var/talentproof/uploads";

export async function uploadFileLocally(buffer: Buffer, originalName: string) {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(originalName);
  const fileName = `${Date.now()}-${randomUUID()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await fs.writeFile(filePath, buffer);
  return {
    storagePath: filePath,
    storageUrl: `/api/files/${fileName}`,
  };
}

export async function readFileFromStorage(storagePath: string): Promise<Buffer> {
  return fs.readFile(storagePath);
}

export async function deleteFileFromStorage(storagePath: string) {
  await fs.unlink(storagePath).catch(() => {});
}