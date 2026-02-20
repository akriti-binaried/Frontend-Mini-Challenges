import React, { useState } from "react";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  
  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([
        ...todos,
        { text: input, completed: false }
      ]);
    }

    setInput("");
  };


  const handleCancel = () => {
    setInput("");
    setEditIndex(null);
  };

  
  const handleDelete = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodos(filtered);
  };

 
  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  
  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const isInputEmpty = !input.trim();

  return (
    <div className="flex flex-col items-center justify-center p-4">

      
      <div  className="bg-white p-6 w-full max-w-md flex flex-col items-center gap-4">

        <input
          type="text"
          placeholder="Enter your work..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`
            w-full p-2 border-2 rounded-lg outline-none transition
            ${input ? "border-blue-500" : "border-gray-300"}
          `}
        />

        <div className="flex gap-4">
          <button
        onClick={handleSubmit}
        disabled={isInputEmpty}
        className={`
        px-4 py-2 rounded-lg text-white font-medium
        transition-all duration-300
        ${isInputEmpty
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-violet-500 hover:bg-violet-600 cursor-pointer"}
        `}
        >
        {editIndex !== null ? "Update" : "Submit"}
    </button>

           <button
        onClick={handleCancel}
        disabled={isInputEmpty}
        className={`
        px-4 py-2 rounded-lg text-white font-medium
        transition-all duration-300
        ${isInputEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-violet-500 hover:bg-violet-600 cursor-pointer"}
        `}
    > 
    Cancel
  </button>

          <div className="flex justify-center items-center">
            <p>Double click on todo to toggle completion status</p>
          </div>
          
        </div>
      </div>

      <div className="mt-6 w-full max-w-md flex flex-col items-center gap-3">

        {todos.map((todo, index) => (
          <div
            key={index}
            className="bg-white w-full p-3 rounded-lg shadow flex justify-between items-center"
          >
            <span
              onDoubleClick={() => handleToggle(index)}
              className={`
                cursor-pointer flex-1 text-center
                ${todo.completed ? "line-through text-gray-400" : ""}
              `}
            >
              {todo.text}
            </span>

            <div className="flex gap-2 ml-3">
              <button
                onClick={() => handleEdit(index)}
                className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:scale-105"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default TodoApp;