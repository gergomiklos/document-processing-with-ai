import {Router} from 'express';
import multer from 'multer'
import imagesOcr from "./middlewares/imagesOcr.js";
import pdf2Images from "./middlewares/pdf2Images.js";
import uuid from "./middlewares/uuid.js";
import searchElastic from "./middlewares/searchElastic.js";
import postElastic from "./middlewares/postElastic.js";
import textTagger from "./middlewares/textTagger.js";
import uploadS3 from "./middlewares/uploadS3.js";
import downloadS3 from "./middlewares/downloadS3.js";

const router = Router();


router.post('/upload',
    multer({storage: multer.memoryStorage()}).array('files'),
    async (_, res, next) => {
        res.sendStatus(200) // early response
        // handle SSE?
        next()
    },
    uuid,
    uploadS3,
    pdf2Images,
    imagesOcr,
    textTagger,
    postElastic,
    async (req, res, next) => {
        // if(req.query.notifiy) => SSE
    },
);

router.post('/search',
    searchElastic,
    async (_, res) => {
        res.status(200).send(res.locals.results)
    },
);

router.get('/download/:filename',
    downloadS3,
    async (_, res) => {
        res.contentType('application/octet-stream')
        res.status(200)
        res.locals.stream.on("data", chunk => res.write(chunk));
        res.locals.stream.once("end", () => res.end());
        res.locals.stream.once("error", () => res.end());
    },
);

export default router;