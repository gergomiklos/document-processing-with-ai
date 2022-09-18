import {exec} from "child_process"

const recognize = (image_input, command, debug = false) => {
    const input = (typeof image_input === 'string') ? image_input : 'stdin';
    const tesseract_command = ['tesseract', input, command].join(' ');

    if (debug) {
        console.debug(tesseract_command);
    }

    return new Promise((resolve, reject) => {
        const child = exec(tesseract_command, (error, stdout, stderr) => {
            if (debug) {
                console.debug(stderr);
            }
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });

        if (input === 'stdin') {
            child.stdin.write(image_input);
            child.stdin.end();
        }
    });
}


export default async (req, res, next) => {

    const pdfs = []
    for (let i = 0; i < res.locals.pdfs.length; i++) {
        const {images, ...rest} = res.locals.pdfs[i];

        let textPages = [];
        for (const image of images) {
            try {
                textPages.push(await recognize(image, `stdout -l hun --psm 1 --oem 3 txt`))
            } catch (error) {
                console.error('Tesseract OCR', error);
            }
        }

        pdfs.push({...rest, _text: textPages.join('\n\n\n\n')});
    }

    res.locals.results = pdfs;

    next();
}