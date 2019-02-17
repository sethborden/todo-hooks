import React, { useState } from "react";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([
    { complete: false, text: "Do things now!" },
    { complete: false, text: "Do things later!" },
    { complete: false, text: "Do things finally!" }
  ]);
  const [draft, setDraft] = useState("");

  function handleDelete(i) {
    setTodos([...todos.slice(0, i), ...todos.slice(i + 1)]);
  }

  return (
    <div className="todos">
      <h1>Todos!</h1>
      <div className="todos-list">
        {todos.length > 0 &&
          todos.map((todo, i) => (
            <Todo
              key={todo.text + i}
              text={todo.text}
              complete={todo.complete}
              handleDelete={() => void handleDelete(i)}
            />
          ))}
        {todos.length === 0 && <div> Add a todo!</div>}
      </div>
      <div className="new-todo">
        <input
          type="text"
          value={draft}
          onChange={event => void setDraft(event.target.value)}
          placeholder="Enter new todo here!"
        />
        <button
          onClick={() => {
            setTodos([
              ...todos,
              { complete: false, text: draft, isediting: true }
            ]);
            setDraft("");
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Todos;
