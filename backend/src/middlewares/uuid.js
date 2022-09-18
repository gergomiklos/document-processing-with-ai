import {v4 as uuidv4} from 'uuid';

export default async (req, res, next) => {

    res.locals.results = req.files.map(({originalname, size, buffer}) => ({
        _uuid: uuidv4(),
        _filename: originalname,
        _size: size,
        buffer
    }))

    next()
}