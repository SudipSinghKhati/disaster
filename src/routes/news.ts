import express from 'express';
import upload from '../middleware/upload';
import newsController from '../controller/news';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/getAllNews', auth.verifyUser, newsController.getAllNews);
router.post('/addNews', auth.verifyUser, newsController.createANews);

router.post("/uploadImage/:postId", upload, newsController.uploadImage);
router.get('/getMyNews', auth.verifyUser, newsController.getAllMyNews);

router.get('/:news_id', auth.verifyUser, newsController.getNewsById);

router.put('/getMyNews/:news_id', newsController.updateNews);
router.delete('/getMyNews/:news_id', newsController.deleteNewsById);
router.post('/', (req: any, res: any) => {
    res.status(405).json({ error: "POST method is not allowed here" });
});

export = router;
