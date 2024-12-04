import express from "express";

import {googleLogin, checkLogin, getSettings, updateSettings} from "../controllers/user.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();

router.get('/me', auth, checkLogin);

router.post('/google', googleLogin);

router.get('/settings', auth, getSettings);

router.patch('/settings', auth, updateSettings);

export default router;