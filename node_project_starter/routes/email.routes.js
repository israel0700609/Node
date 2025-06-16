import express from 'express';
import {
  validateEmailAddress,
  addEmailToBlacklist,
  getBlacklistedEmails,
  removeEmailFromBlacklist,
  getWhitelistEmails, 
  addEmailToWhitelist, 
  removeEmailFromWhitelist 
} from '../controllers/email.controller.js';

const router = express.Router();

router.get('/validate', validateEmailAddress);

router.post('/blacklist/add', addEmailToBlacklist);
router.get('/blacklist', getBlacklistedEmails);
router.delete('/blacklist/remove', removeEmailFromBlacklist);

// ראוטי Whitelist
router.get('/whitelist', getWhitelistEmails);
router.post('/whitelist/add', addEmailToWhitelist);
router.delete('/whitelist/remove', removeEmailFromWhitelist);

export default router;