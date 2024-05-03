import express from "express";
import {
    deleteVideos,
    getVideos,
    getVideosById,
    saveVideos,
    updateVideos
} from '../controllers/videosController.js';

const router = express.Router();

router.get('/videos', getVideos);
router.get('/videos/:id', getVideosById);
router.post('/videos', saveVideos);
router.patch('/videos/:id', updateVideos);
router.delete('/videos/:id', deleteVideos);

export default router;