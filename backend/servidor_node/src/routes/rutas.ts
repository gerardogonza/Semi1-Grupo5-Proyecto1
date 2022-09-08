import { Router } from "express";
const router = Router();

import {principal ,ejecutar} from '../controllers/controller';


// router.get("/videos", videosCtrl.getVideos);

// router.get("/videos/:id", videosCtrl.getVideo);

 router.post("/prueba", ejecutar);
router.get("/", principal);



export default router; 