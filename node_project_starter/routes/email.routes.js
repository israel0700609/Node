// routes/email.routes.js
import express from 'express';
import {
  validateEmailAddress,
  addEmailToBlacklist,
  getBlacklistedEmails,
  removeEmailFromBlacklist // This function will be updated
} from '../controllers/email.controller.js';

const router = express.Router();

// Email Validation
router.get('/validate', validateEmailAddress);

// Blacklist Management
router.post('/blacklist/add', addEmailToBlacklist);
router.get('/blacklist', getBlacklistedEmails);
// --- CHANGE IS HERE ---
// Old: router.delete('/blacklist/remove/:emailAddress', removeEmailFromBlacklist);
router.delete('/blacklist/remove', removeEmailFromBlacklist); // No URL parameter here
// --------------------

export default router;