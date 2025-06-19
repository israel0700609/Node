// services/dataStorage.js
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data'); 

const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    
    if (error.code !== 'EEXIST') {
      console.error('Error creating data directory:', error);
      throw error;
    }
  }
};

export const getData = async (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    await ensureDataDir();
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Data file ${filename} not found.`);
      return null; 
    }
    console.error(`Error reading data from ${filename}:`, error);
    throw error;
  }
};

export const addData = async (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data successfully written to ${filename}`);
  } catch (error) {
    console.error(`Error writing data to ${filename}:`, error);
    throw error;
  }
};