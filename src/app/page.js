'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title, description, completed: false };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className={"container"}>
      <h1 className="title-header">To-Do List </h1>
      <form onSubmit={addTask} className={"form"}>
        <input
          type="text"
          className={"input"}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task description"
          value={description}
          className={"textarea"}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className={"submit"}>Add Task</button>
      </form>

      <ul className={"taskList"}>
        {tasks.map((task, idx) => (
          <li key={idx} className={"completed" ? "completed" : ""}>
            <div className={"taskHeader"}>
              <strong>{task.title}</strong>
              <div className={"taskActions"}>
                <button onClick={() => toggleTask(idx)}
                   className={"doneBtn"}
                  >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(idx)}
                  className={"deleteBtn"}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
       <div className="footer">
           <p className="title-footer">Powered by</p>
          <img src="/images/logo.png" alt="Logo" width="150" height="auto" />
       </div>
    </div>
  );
}
