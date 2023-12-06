import { useState, useEffect } from "react";
export default function Todos() {
    const [todoList, setTodoList] = useState([]);
    const [myTodos, setMyTodos] = useState([]);
    const [selectButton, setSelectButton] = useState(false);

    const storage = localStorage.getItem("currentUser")
    const parsed = JSON.parse(storage)
    const userId = parsed.id
    const requstTotos = () => {
        fetch(`http://localhost:4000/todos?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setTodoList(data);
                setMyTodos(data);
            });
    };
    // render Only once to show all tasks
    useEffect(() => {
        requstTotos();
    }, []);
    // to show all select buttons
    const showSelects = () => {
        setSelectButton(!selectButton);
    };
    // select to A B C
    const selectABC = () => {
        const nativTodos = [...myTodos];
        const SortedTodos = nativTodos.sort((todo1, todo2) => todo1.title.localeCompare(todo2.title));
        setTodoList(SortedTodos);
    };
    // select if true or false
    const selectTrue = () => { setTodoList(myTodos.filter((todo) => todo.completed)); };
    const selectFalse = () => { setTodoList(myTodos.filter((todo) => !todo.completed)); };
    //delete from list
    const deleteTodo = (id) => {
        fetch(`http://localhost:4000/todos/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    // Update the todos in the state
                    const newTodos = myTodos.filter((todo) => todo.id !== id);
                    setMyTodos(newTodos);
                    setTodoList(newTodos);
                } else { console.error("Error deleting todo:", response.status); }
            }).catch((error) => { console.error("Error sending DELETE request:", error); });
    };
    //update the todos
    const upDateTrue = (todo) => {
        const bool = !todo.completed;
        fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: bool,
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        }).then((response) => {
            if (response.ok) {
                if (todo.completed) setMyTodos(todoList.map((t) => (t.id === todo.id ? todo.completed = false : t)));
                else setMyTodos(todoList.map((t) => (t.id === todo.id ? todo.completed = true : t)));
            }
        });
    };
    //show todo list
    const showTodos = () => {
        return (
            <div className="listCheckbox">
                {todoList && todoList.length > 0 && (
                    <h3>{todoList.map((todo) => (
                        <div key={todo.id}>
                            {todo.completed ? <span>✅&emsp;</span> : <span>❌&emsp;</span>}
                            <input type="checkbox" className="checkbox" onChange={() => upDateTrue(todo)} />
                            {todo.id}{" : "}{todo.title}
                            <span onClick={() => deleteTodo(todo.id)}>🗑️</span>
                        </div>))}</h3>)} </div>);
    };
    return (
        <div className="todo">
            <h1>{parsed.name}</h1>
            <h1>Todos list</h1>
            <button onClick={showSelects}>Select</button>
            <div className="select">
                {selectButton && (
                     <div> <button onClick={selectABC}>ABC</button>
                        <button onClick={selectTrue}>Completed</button>
                        <button onClick={selectFalse}>Not completed</button> </div>)}
            </div>
            {showTodos()}
        </div>
    );
}
