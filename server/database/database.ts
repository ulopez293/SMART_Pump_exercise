import { join } from 'path'
import fs from 'fs'

interface Low {
    data: Array<string>
}

export const getConnection =  async () => {
    try {
        const { Low } = await import('lowdb')
        const { JSONFile } = await import('lowdb/node')
        const file = join(__dirname, `./json/users.json`)
        const data = fs.readFileSync(file, 'utf-8')
        const adapter = new JSONFile(file)
        const defaultData = JSON.parse(data)
        const db: Low = new Low(adapter, defaultData)
        return db
    } catch (error) {
        console.error(`Error to read file JSON: ${error}`)
    }
}