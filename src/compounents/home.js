import React, { useEffect, useState } from "react";
import "../App.css";
import View from "./View";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setPriority] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState("");

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const priorityStyles = {
    low: { backgroundColor: "green", color: "white" },
    medium: { backgroundColor: "yellow", color: "black" },
    high: { backgroundColor: "red", color: "white" },
  };

  const handleAddTode = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };

  const handleEditTodo = (item, index) => {
    setNewTitle(item.title);
    setNewDescription(item.description);
    setPriority(item.priority);
    console.log(item);
    console.log(index);

    setIndex(index);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let updatedTodo = {
      newTitle,
      newDescription,
      newPriority,
    };

    setTodos((prevTodos) =>
      prevTodos.map((item, itemIndex) =>
        itemIndex === index ? updatedTodo : item
      )
    );

    let todos = JSON.parse(localStorage.getItem("todolist")) || [todos];

    //  setNewTitle(newTitle);
    //  setNewDescription(newDescription);
    //  setPriority(newPriority)
    console.log(allTodos);
    setTodos(
      allTodos.map((item, itemIndex) => {
        console.log(index);

        console.log(itemIndex);
        return itemIndex === index ? updatedTodo : item;
      })
    );

    console.log(updatedTodo);

    localStorage.setItem("users", JSON.stringify(updatedTodo));
    // setTodos(updatedTodo)
  };

  const handleSearch = () => {
    const searchData = JSON.parse(localStorage.getItem("todolist"));
    console.log(searchData[0]);
    setSearchQuery(
      searchData.filter((item) => {
        console.log(item);
        return item.title === search;
      })
    );

    setIsSearching(true);
    console.log("Search item", searchData);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todolist")) || [];
    setTodos(storedData);
    console.log(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  useEffect(() => {
    console.log(allTodos);
  }, [allTodos]);

  return (
    <div className="App">
      <div className="todo-wrapper">
        <h1>To do list App</h1>
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Get things Done!</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What are we doing today?"
            />
          </div>

         
          <div className="dropDown-Btn" style={{ marginBottom: "20px", padding:'20px', paddingTop:'72px' }}>
            <select
              value={newPriority}
              onChange={handleChangePriority}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#333",
                cursor: "pointer",
              }}
            >
              <option style={{ color: "#aaa" }}>Priority</option>
              <option
                className="low"
                value="low"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Low
              </option>
              <option
                className="medium"
                value="medium"
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                Medium
              </option>
              <option
                className="high"
                value="high"
                style={{ backgroundColor: "red", color: "white" }}
              >
                High
              </option>
            </select>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTode}
              className="PrimaryBtn"
            >
              Add{" "}
            </button>
            <br></br>
            <button
              type="button"
              onClick={(e) => handleUpdate(e)}
              className="primaryBtn"
            >
              Update
            </button>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          {searchQuery.length > 0 ? (
            <View
              allTodos={searchQuery}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
            />
          ) : (
            <View
              allTodos={allTodos}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
