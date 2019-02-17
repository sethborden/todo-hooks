import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Todo({ complete, text, doneTime, handleDelete }) {
  const [done, setDone] = useState(complete);
  const [todo, setTodo] = useState(text);
  const [editing, setEditing] = useState(false);
  const [time, setDoneTime] = useState(doneTime);

  function handleDone() {
    if (!done) {
      setDoneTime(new Date().toLocaleString());
      setDone(true);
    } else {
      setDone(false);
    }
  }

  return (
    <div className="todo">
      <div className="top-row">
        <div className="controls">
          <input type="checkbox" checked={done} onChange={handleDone} />
          <input
            type="text"
            value={todo}
            className={[
              `${editing ? "editing" : "not-editing"}`,
              `${done ? "complete" : "incomplete"}`
            ].join(" ")}
            onChange={event => {
              setTodo(event.target.value);
            }}
            onFocus={() => void setEditing(true)}
            onBlur={() => void setEditing(false)}
          />
        </div>
        <button className="delete-button" onClick={() => void handleDelete()}>
          &#215;
        </button>
      </div>
      <div className="done-time">{done ? time : ""}</div>
    </div>
  );
}

function App() {
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
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
