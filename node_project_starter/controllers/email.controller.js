// controllers/email.controller.js
import { validateEmail } from '../services/externalApi.js';
import { addData, getData } from '../services/dataStorage.js';
import { getWhitelist, addToWhitelist, removeFromWhitelist } from '../services/whitelist.js';

const BLACKLIST_FILE = 'emailBlacklist.json';

export const validateEmailAddress = async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ success: false, message: 'Email address is required.' });
  }

  try {
    const whitelist = await getWhitelist();
    if (whitelist.includes(address)) {
      console.log(`Email '${address}' found in whitelist. Skipping external validation.`);
      return res.status(200).json({
        success: true,
        data: {
          email: address,
          is_valid_format: true,
          is_smtp_valid: true,
          fromWhitelist: true,
        }
      });
    }

    const validationResult = await validateEmail(address);

    if (validationResult && validationResult.is_valid_format.value === true && validationResult.is_smtp_valid.value === true) {
      await addToWhitelist(address); 
      console.log(`Email '${address}' validated successfully by API and added to whitelist.`);
    } else {
      console.log(`Email '${address}' validated by API but is NOT considered valid. Details: `);
      console.log(validationResult); 
    }

    res.status(200).json({ success: true, data: validationResult });

  } catch (error) {
    console.error(`Error validating email '${address}':`, error.message);
    res.status(500).json({ success: false, message: 'Failed to validate email address. Please try again later.' });
  }
};

export const addEmailToBlacklist = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required in request body.' });
  }

  try {
    let blacklist = await getData(BLACKLIST_FILE);
    if (!blacklist) {
      blacklist = [];
    }

    if (blacklist.includes(email)) {
      return res.status(409).json({ success: false, message: 'Email already in blacklist.' });
    }

    blacklist.push(email);
    await addData(BLACKLIST_FILE, blacklist);

    res.status(201).json({ success: true, message: 'Email added to blacklist successfully.' });
  } catch (error) {
    console.error(`Error adding email to blacklist ${email}:`, error.message);
    res.status(500).json({ success: false, message: 'Failed to add email to blacklist.' });
  }
};

export const getBlacklistedEmails = async (req, res) => {
  try {
    const blacklist = await getData(BLACKLIST_FILE);
    res.status(200).json({ success: true, data: blacklist || [] });
  } catch (error) {
    console.error('Error getting blacklisted emails:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve blacklisted emails.' });
  }
};

export const removeEmailFromBlacklist = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required in request body.' });
  }

  try {
    let blacklist = await getData(BLACKLIST_FILE);
    if (!blacklist) {
      return res.status(404).json({ success: false, message: 'Blacklist is empty or not found. Email cannot be removed.' });
    }

    const initialLength = blacklist.length;
    blacklist = blacklist.filter(item => item !== email);

    if (blacklist.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Email not found in blacklist.' });
    }

    await addData(BLACKLIST_FILE, blacklist);

    res.status(200).json({ success: true, message: 'Email removed from blacklist successfully.' });
  } catch (error) {
    console.error(`Error removing email from blacklist ${email}:`, error.message);
    res.status(500).json({ success: false, message: 'Failed to remove email from blacklist.' });
  }
};

export const getWhitelistEmails = async (req, res) => {
  try {
    const whitelist = await getWhitelist();
    res.status(200).json({ success: true, data: whitelist || [] });
  } catch (error) {
    console.error('Error getting whitelisted emails:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve whitelisted emails.' });
  }
};

export const addEmailToWhitelist = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required in request body.' });
  }

  try {
    await addToWhitelist(email);
    res.status(201).json({ success: true, message: 'Email added to whitelist successfully.' });
  } catch (error) {
    console.error(`Error adding email to whitelist ${email}:`, error.message);
    res.status(500).json({ success: false, message: 'Failed to add email to whitelist.' });
  }
};

export const removeEmailFromWhitelist = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required in request body.' });
  }

  try {
    const removed = await removeFromWhitelist(email);

    if (!removed) {
      return res.status(404).json({ success: false, message: 'Email not found in whitelist.' });
    }

    res.status(200).json({ success: true, message: 'Email removed from whitelist successfully.' });
  } catch (error) {
    console.error(`Error removing email from whitelist ${email}:`, error.message);
    res.status(500).json({ success: false, message: 'Failed to remove email from whitelist.' });
  }
};