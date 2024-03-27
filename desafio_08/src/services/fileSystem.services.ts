import fs from 'fs';

export async function createDirectory(directoryPath: string): Promise<void> {
  try {
    if (!directoryPath) {
      throw new Error('La ruta del directorio no es válida.');
    }
    await fs.promises.access(directoryPath, fs.constants.F_OK);
  } catch (err: any) {
    try {
      await fs.promises.mkdir(directoryPath, { recursive: true });
    } catch (createErr: any) {
      throw new Error(`Error al crear directorio: ${createErr.message}`);
    }
  }
}

export async function createFile(filePath: string, data: any): Promise<void> {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (err: any) {
    try {
      await fs.promises.writeFile(filePath, data);
    } catch (writeErr: any) {
      console.error(`Error al crear el archivo: ${writeErr.message}`);
      throw new Error(`Error al crear el archivo: ${err.message}`);
    }
  }
}

export async function readFile(filePath: string): Promise<any> {
  try {
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (err: any) {
    throw new Error(`Error al leer el archivo: ${err.message}`);
  }
}

export async function writeFile(filePath: string, data: any): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(filePath, jsonData);
  } catch (err: any) {
    throw new Error(`Error al escribir el archivo: ${err.message}`);
  }
}
