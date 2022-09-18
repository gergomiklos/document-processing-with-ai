import fs from 'fs'
import {Poppler} from 'node-poppler'

const poppler = new Poppler('resources/poppler/Release-21.09.0/poppler-21.09.0/Library/bin');

const removeDir = (dir) => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, {recursive: true});
    }
}

const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
}

const readFiles = (dir) => {
    return fs.readdirSync(dir).map(filename => {
        return fs.readFileSync(dir + filename);
    });
}

export default async (req, res, next) => {

    const pdfs = []
    for (const {buffer, ...rest} of res.locals.results) {
        const temp_dir = Date.now().toString(36) + Math.random().toString(36);
        const path = `./resources/tmp/pdf2Images/${temp_dir}/`;
        try {
            createDir(path);

            const options = {
                pngFile: true,
                resolutionXYAxis: 300,
            }
            await poppler.pdfToCairo(buffer, path, options);

            const images = readFiles(path);
            pdfs.push({...rest, images});

        } catch (error) {
            console.error('PDF To Image', error);
        }
        removeDir(path);
    }

    res.locals.pdfs = pdfs;

    next();
}