import { randomUUID } from 'node:crypto'

// In-Memory Database
// インメモリデータベース
export class DatabaseMemory {

  #videos = new Map()

  list(search) {
    // return an array with all videos and ID
    // 全てのビデオとIDを返す
    return Array.from(this.#videos.entries())
      .map((video) => {
        const id = video[0]
        const data = video[1]

        return {
          id,
          ...data
        }
      })
      // filter videos by search
      // 検索によってビデオをフィルタリング
      .filter((video) => {
        if(search) {
          return video.title.includes(search)
        }
        return true
      })
  }

  // method to create a new video
  // 新しいビデオを作成する方法
  create(video) {
    //Function that returns unique IDs
    // 一意のIDを返す関数
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }
  // method to update a video
  // ビデオを更新する方法
  update(id, video) {
    this.#videos.set(id, video)
  }

  // method to delete a video
  // ビデオを削除する方法
  delete(id) {
    this.#videos.delete(id)
  }
}