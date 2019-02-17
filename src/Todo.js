import React, { useState } from "react";

const Todo = ({ complete, text, doneTime, handleDelete }) => {
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
};

export default Todo;
