// services/whitelist.js
import { getData, addData } from './dataStorage.js';

const WHITELIST_FILE = 'emailWhitelist.json';

export const getWhitelist = async () => {
  return await getData(WHITELIST_FILE) || [];
};

export const addToWhitelist = async (email) => {
  let whitelist = await getWhitelist();
  if (!whitelist.includes(email)) {
    whitelist.push(email);
    await addData(WHITELIST_FILE, whitelist);
    console.log(`Email '${email}' added to whitelist.`);
  } else {
    console.log(`Email '${email}' already in whitelist.`);
  }
};

export const removeFromWhitelist = async (email) => {
  let whitelist = await getWhitelist();
  const initialLength = whitelist.length;
  whitelist = whitelist.filter(e => e !== email);
  if (whitelist.length < initialLength) {
    await addData(WHITELIST_FILE, whitelist);
    console.log(`Email '${email}' removed from whitelist.`);
    return true; 
  } else {
    console.log(`Email '${email}' not found in whitelist.`);
    return false; 
  }
};