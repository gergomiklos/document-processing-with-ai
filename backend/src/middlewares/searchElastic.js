import client from '../elasticClient.js'

export default async (req, res, next) => {

    const searchParams = req.body

    let results
    if (searchParams._scroll_id) {
        results = await client.scroll({
            scrollId: searchParams._scroll_id,
            scroll: '1h'
        })
    } else {
        results = await client.search({
            index: 'ekrdocs', // otherwise all indexes, but does not work with match al
            body: {
                query: searchParams?.query || {match_all: {}} // { "match": { "_text": "This will match" } }
            },
            size: 20,
            scroll: '1h'
        })
    }

    const {body: {_scroll_id, took, hits}} = results
    res.locals.results = {
        _scroll_id,
        took,
        hits: hits.hits.map(({_score, _source: {_text, ...rest}}) => ({_score, ...rest}))
    }

    next()
}