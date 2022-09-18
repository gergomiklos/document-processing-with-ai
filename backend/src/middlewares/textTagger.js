import Axios from 'axios'

const taggerModel = Axios.create({baseURL: 'http://localhost:5000', timeout: 5 * 60 * 1000})

export default async (req, res, next) => {

    const {data: results} = await taggerModel.post(
        '/predict',
        res.locals.results.map(({_text}) => _text),
    )

    const zip = (a, b) => a.map((k, i) => ({...k, ...b[i]}))
    res.locals.results = zip(res.locals.results, results)

    next()
}