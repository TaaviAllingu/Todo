import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://demo2.z-bit.ee";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [token] = useState("Uen2WHRKwjGeQtldvD5VCN6R-viWyT5Z");

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post(
      `${API_URL}/tasks`,
      { title: newTask, completed: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(
      `${API_URL}/tasks/${task.id}`,
      { ...task, completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ToDo Rakendus</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2 w-64"
          placeholder="Uus ülesanne"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1" onClick={addTask}>
          Lisa
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between mb-2">
            <span
              onClick={() => toggleTask(task)}
              className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>
            <button
              className="text-red-500 hover:underline"
              onClick={() => deleteTask(task.id)}
            >
              Kustuta
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
