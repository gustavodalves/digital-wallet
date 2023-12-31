import 'dotenv/config'

export default class Env {
    static get(
        key: string
    ) {
        const value = process.env[key]

        if(!value) throw new Error(`key ${key} dont exists`)

        return value
    }
}
