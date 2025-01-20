import { randomUUID } from 'node:crypto'
import sql from './db.js'


export class DatabasePostgres {
  async list(search) {
    let videos

    if(search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${`%${search}%`}`
    } else {
      videos = await sql`SELECT * FROM videos`
    }

    return videos
  }

  // method to create a new video
  // 新しいビデオを作成する方法
  async create(video) {
    //Function that returns unique IDs
    // 一意のIDを返す関数
    const videoId = randomUUID()
    const {title, description, duration, views} = video
    await sql`INSERT INTO videos (id, title, description, duration, views) VALUES (${videoId}, ${title}, ${description}, ${duration}, ${views})`

  }
  // method to update a video
  // ビデオを更新する方法
  async update(id, video) {
    const {title, description, duration, views} = video
    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration}, views = ${views} WHERE id = ${id}`

  }

  // method to delete a video
  // ビデオを削除する方法
  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`
  }
}