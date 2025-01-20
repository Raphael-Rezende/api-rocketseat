// import { createServer } from 'node:http'

// const server =  createServer((req, res) => {
//     res.write('Hello World')

//     return res.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const app = fastify()

// Create a new database
// 新しいデータベースを作成
// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// INFO: query parameters, They are used to perform specific filtering or sorting of data.
// 注：クエリパラメータは特定のデータのフィルタリングやソートを行うために使用されます。
app.get('/', async(request) => {
    // Getting specific data from the header
    // ヘッダーから特定のデータを取得
    const search = request.query.search

    const videos = await database.list(search)
    return videos
})
app.post('/videos', async(request, reply) => {

    // Get the body of the request
    // リクエストの本文を取得
    const {title, description, duration, views} = request.body

    // Create a new video
    // 新しいビデオを作成
    await database.create({
        title,
        description,
        duration,
        views
    })
    console.log(database.list())
    // NOTE: the http code 201 means that something was created
    // 注: httpコード201は何かが作成されたことを意味します
    return reply.status(201).send()
})

app.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id 
    const {title, description, duration, views} = request.body

    const video = await database.update(videoId, {
        title,
        description,
        duration,
        views   
    })
    // NOTE: http code 204 means success, but no response content
    // 注: httpコード204は成功し、レスポンドの内容がないことを意味します
    return reply.status(204).send()
})

app.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id 

    await database.delete(videoId)
    return reply.status(204).send()
})

app.listen({
    port: process.env.PORT || 3333,
})

