const getAllTodos = async (client) => {
    try {
        const results = await client.query('select * from ToDos');
        return results.rows;
    } catch (err) {
        console.log('>> err while getting todos', err)
        return [];
    }
}

module.exports = {
    getAllTodos
}