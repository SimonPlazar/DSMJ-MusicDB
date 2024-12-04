import express from "express";
import { getSongs, createSong, createMultipleSongs, updateSong, deleteMultipleSongs, deleteSong } from "../controllers/songs.js";
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getSongs);
router.post('/', auth, createSong);
router.post('/songs', auth, createMultipleSongs);
router.patch('/:id', auth, updateSong);
router.delete('/:id', auth, deleteSong);
router.delete('/multiple', auth, deleteMultipleSongs);
export default router;