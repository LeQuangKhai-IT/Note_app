const {getConnection} = require('./database.js')
const { Notification } = require('electron')
 
// Create Item 
const createItem= async (infor) => {
    try {
        const conn = await getConnection()
        const result = await conn.query("INSERT INTO infor SET ?", infor)
        infor.id = result.insertId;

        new Notification({
            title:'Electron Mysql',
            body:'New Note Saved successfully!'
        }).show();

        return infor;
    } catch (error) {
        console.log(error)
    }
}

//Get Item
const getItemById = async (id)=> {
    try {
        const conn = await getConnection()
        const result = await conn.query("SELECT * FROM infor WHERE id = ? ",id)
        return result
    } catch (error) {
        console.log(error)
    }
}


// Get Items

const getItems = async () =>{
    try {
        const conn = await getConnection()
        const results = await conn.query("SELECT * FROM infor ORDER BY id DESC")
        return results
    } catch (error) {
        console.log(error)
    }
}
//Update Item

const updateItem = async (id, item) =>{
    try {
        const conn = await getConnection()
        const result = await conn.query("UPDATE infor SET ? WHERE id = ?", [item,id])
        return result
    } catch (error) {
        console.log(error)
    }
}
//Delete Item
const deleteItem = async (id) => {
    try {
        const conn = await getConnection()
        const result = await conn.query("DELETE FROM infor WHERE id = ?", id)
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
}