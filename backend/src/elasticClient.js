import {Client} from '@elastic/elasticsearch'

export default new Client({
    cloud: {
        id: process.env.ELASTIC_ID || 'ELASTIC_ID',
    },
    auth: {
        username: process.env.ELASTIC_USERNAME || 'ELASTIC_USERNAME',
        password: process.env.ELASTIC_PW || 'ELASTIC_PW'
    }
})