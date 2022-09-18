import client from '../elasticClient.js'

export default async (_, res, next) => {

    const docs = res.locals.results.flatMap(doc => [{index: {_index: 'test_docs'}}, doc])

    await client.bulk({
        refresh: true,
        body: docs
    })

    next()
}