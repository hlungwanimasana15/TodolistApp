import React, { useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';

const View = ({allTodos, handleDeleteTodo, handleEditTodo }) => {
 
  useEffect(() => {
    console.log('View component re-rendered with updated allTodos:', allTodos);
  }, [allTodos]);
  
  return (
    <div>
     {allTodos.map((item, index) => {
          return (
          <div className={`todo-list-item ${item.priority}`} key={index} >
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.priority}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title="Delete?" />
                <AiFillEdit className='edit-icon' onClick={() => handleEditTodo(item, index)} title="Edit?" />
              </div>
            </div>
          )

        })}
        </div>
  )
}

export default View