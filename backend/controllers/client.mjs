import fs from 'fs'
import { v4 as uuid } from 'uuid'
// on import les modules pour résoudre les chemins : path et url
import * as path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname( fileURLToPath(import.meta.url) )

const getItems = (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'))
        res.send(data)
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const getItem = (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'))
        const items = JSON.parse(data)
        const item = items.find(item => item.id == req.params.id)
        if(item){
            res.json(item)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const patchItem = (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'))
        const items = JSON.parse(data)
        let index = items.findIndex(item => item.id == req.params.id)

        items[index] = {
            ...items[index],
            ...req.body,
        }
        fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items) )
        res.json(items[index])
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const postItem = (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'))
        const items = JSON.parse(data)
        const newClient = { ...req.body, id: uuid() }
        items.push(newClient)
        fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items) )
        res.json(newClient)
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

const deleteItem = (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'))
        let items = JSON.parse(data)
        items = items.filter(item => item.id != req.params.id)

        fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items))
        // 200 code http : OK
        // 201 code http : CREATED
        // 202 code http : ACCEPTED
        // 203 code http : NON-AUTHORITATIVE INFORMATION
        // 204 code http : NO CONTENT
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        throw error
    }
}

export default {
    deleteItem,
    getItem,
    getItems,
    patchItem,
    postItem
}

