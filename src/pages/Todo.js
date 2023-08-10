import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [modifyObject, setModifyObject] = useState({
    todo: null,
    id: null,
    flag: false
  });

  const API_URL = "https://www.pre-onboarding-selection-task.shop/todos";

  const getTodos = async () => {
    try {
      const { status, data } = await axios
        .get(API_URL,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );

      if (status === 200) {
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

      const { status, data } = await axios
        .post(API_URL,
          param,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );

      if (status === 201) {
        setTodoList(currentList => [...currentList, data]);
      } else {
        throw new Error('not status 201');
      }
    } catch (error) {
      console.log(`[onCreateTodo Error] ${error}`);
    }

    setTodo("");
  };

  const onDeleteTodo = async (id) => {
    try {
      const { status } = await axios
        .delete(`${API_URL}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );

      if (status === 204) {
        setTodoList(currentList => {
          return currentList.filter(item => item.id !== id);
        })
      }
    } catch (error) {
      console.log(`[onDeleteTodo Error] ${error}`);
    }
  }

  const onModifyButtonClick = (todosItem) => {
    setModifyObject({
      todo: todosItem.todo,
      id: todosItem.id,
      flag: true
    })
  }

  const initModifyObject = () => {
    setModifyObject({
      todo: null,
      id: null,
      flag: false
    })
  }

  const onUpdateTodo = async (setObj) => {
    try {
      const param = {
        todo: setObj.setTodo,
        isCompleted: setObj.setCompleted
      }

      const { status, data } = await axios
        .put(`${API_URL}/${setObj.todoId}`,
          param,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signinToken")}`
            }
          }
        );

      if (status === 200) {
        setTodoList(currentList => {
          return currentList.map(item => {
            if (item.id === setObj.todoId) {
              return data;
            } else {
              return item;
            }
          })
        });
      }
    } catch (error) {
      console.log(`[onUpdateTodo Error] ${error}`);
    }
  }

  const underLineStyle = {
    textDecoration: 'line-through'
  }

  return (
    <div>
      <h1>My To Dos ({todoList.length})</h1>
      <form onSubmit={onCreateTodo}>
        <input
          value={todo}
          type="text"
          placeholder="Write your to do..."
          onChange={(event) => setTodo(event.target.value)}
          data-testid="new-todo-input"
        />
        <button
          type='submit'
          data-testid="new-todo-add-button"
        >
          추가
        </button>
      </form>
      <hr />
      <ul>
        {todoList.map((item) => (
          <li key={item.id} style={item.isCompleted ? underLineStyle : {}}>
            <input
              id={item.id}
              type='checkbox'
              value={item.isCompleted}
              checked={item.isCompleted}
              onChange={(event) => {
                const setObj = {
                  todoId: item.id,
                  setTodo: item.todo,
                  setCompleted: event.target.checked
                }

                onUpdateTodo(setObj);
              }}
              data-testid="modify-input"
            />
            {
              (item.id === modifyObject.id && modifyObject.flag)
                ? <>
                  <input
                    value={modifyObject.todo}
                    onChange={(event) => {
                      setModifyObject({
                        ...modifyObject,
                        todo: event.target.value
                      });
                    }}
                    data-testid="modify-input"
                  />
                  <button
                    type='button'
                    onClick={() => {
                      const setObj = {
                        todoId: item.id,
                        setTodo: modifyObject.todo,
                        setCompleted: item.isCompleted
                      }

                      onUpdateTodo(setObj);
                      initModifyObject();
                    }}
                    data-testid="submit-button"
                  >
                    제출
                  </button>
                  <button
                    type='button'
                    onClick={() => initModifyObject()}
                    data-testid="cancel-button"
                  >
                    취소
                  </button>
                </>
                : <>
                  <label htmlFor={item.id}>
                    <span>
                      {item.todo}
                    </span>
                  </label>
                  <button
                    type='button'
                    onClick={() => onModifyButtonClick(item)}
                    data-testid="modify-button"
                  >
                    수정
                  </button>
                  <button
                    type='button'
                    onClick={() => onDeleteTodo(item.id)}
                    data-testid="delete-button"
                  >
                    삭제
                  </button>
                </>}
          </li>
        ))}
      </ul>
    </div>
  );
}
