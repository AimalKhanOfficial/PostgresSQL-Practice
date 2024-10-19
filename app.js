const express = require('express');
const app = express();
app.use(express.json());

const { openConnection, closeConnection } = require('./database_handlers/connectionManager');
const { createAllTables, saveNewTodo } = require('./database_handlers/creationManager');
const { getAllTodos } = require('./database_handlers/queryManager');

app.get('/getAllToDos', async (req, res) => {
    try {
        const client = await openConnection();
        const allTodos = await getAllTodos(client);
        closeConnection(client);
        return res.json({
            message: 'success',
            allTodos
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong, please try again.',
        })
    }
})

app.post('/saveNewTodo', async (req, res) => {
    try {
        const {title, desc} = req.body;
        const client = await openConnection();
        const id = await saveNewTodo(client, title, desc);
        closeConnection(client);
        return res.json({
            message: `Todo Item created with id: ${id}`
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong, please try again.',
        })
    }
})

app.listen(3000, async () => {
    const client = await openConnection();
    createAllTables(client);
    closeConnection(client);
    console.log('>> App is listenting on port 3000, go ahead!');
})