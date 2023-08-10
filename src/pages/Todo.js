import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const API_URL = "https://www.pre-onboarding-selection-task.shop/todos";

  const getTodos = async () => {
    try {
      const {status, data} = await axios
        .get(API_URL,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );
      
      if(status === 200) {
        setTodoList(data);
      } else {
        throw new Error('not status 200');
      }
    } catch (error) {
      console.log(`[getTodos Error] ${error}`);
    }
  }

  useEffect(() => {
    getTodos()
  }, []);

  /**@function onSubmit
   * 1. submit 이벤트 발생 시 페이지 새로고침 막기
   * 2. toDo 입력란이 빈값이 아니면 setToDoList를 이용해서 toDo 추가
   * 3. toDo 입력란 빈값으로 초기화
   */
  const onCreateTodo = async (event) => {
    event.preventDefault();

    if (todo === "") {
      return;
    }

    try {
      const param = {
        todo: todo
      }

      const { status } = await axios
        .post(API_URL,
          param,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );

      if (status === 201) {
        console.log(status);
      } else {
        throw new Error('not status 201');
      }
    } catch (error) {
      console.log(`[onCreateTodo Error] ${error}`);
    }

    setTodo("");
  };

  return (
    <div>
      <h1>My To Dos ({todoList.length})</h1>
      <form onSubmit={onCreateTodo}>
        <input
          value={todo}
          type="text"
          placeholder="Write your to do..."
          onChange={(event) => setTodo(event.target.value)}
        />
        <button>Add Todo</button>
      </form>
      <hr />
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.todo}</li>
        ))}
      </ul>
    </div>
  );
}
