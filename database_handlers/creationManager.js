const allTables = `
  CREATE TABLE ToDos(
    id serial PRIMARY KEY,
    todo_name VARCHAR(255),
    todo_desc VARCHAR(255)
  );
`;


const newToDo =
'INSERT INTO todos(todo_name, todo_desc) VALUES ($1, $2) RETURNING id';

const createAllTables = async (client) => {
    try {
        const result = await client.query(allTables);
        console.log('>> Table created successfully', result);
    } catch (err) {
        //console.error('>> Error creating table', err);
    }
};

const saveNewTodo = async (client, title, desc) => {
    try {
        const result = await client.query(newToDo, [title, desc]);
        console.log('>> New ToDo Created successfully:', result.rows[0].id);
        return result.rows[0].id;
    } catch (err) {
        console.error('>> Error creating a new todo', err);
    }
};

module.exports = {
    createAllTables,
    saveNewTodo
}