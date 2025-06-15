// controllers/email.controller.js
import { validateEmail } from '../services/externalApi.js';
import { addData, getData } from '../services/dataStorage.js'; 

const BLACKLIST_FILE = 'emailBlacklist.json'; 

export const validateEmailAddress = async (req, res) => {
  const { address } = req.query; 

  if (!address) {
    return res.status(400).json({ success: false, message: 'Email address is required.' });
  }

  try {
    const validationResult = await validateEmail(address);
    res.status(200).json({ success: true, data: validationResult });
  } catch (error) {
    console.error(`Error validating email ${address}:`, error.message);
   
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
      // If blacklist file is empty or not found, email cannot exist in it.
      return res.status(404).json({ success: false, message: 'Blacklist is empty or not found. Email cannot be removed.' });
    }

    const initialLength = blacklist.length;
    // Filter out the email to be removed
    blacklist = blacklist.filter(item => item !== email); // Filter by 'email' from body

    if (blacklist.length === initialLength) {
      // If the length didn't change, the email wasn't found in the list
      return res.status(404).json({ success: false, message: 'Email not found in blacklist.' });
    }

    await addData(BLACKLIST_FILE, blacklist); // Save the updated list (with item removed)

    res.status(200).json({ success: true, message: 'Email removed from blacklist successfully.' });
  } catch (error) {
    console.error(`Error removing email from blacklist ${email}:`, error.message);
    res.status(500).json({ success: false, message: 'Failed to remove email from blacklist.' });
  }
};