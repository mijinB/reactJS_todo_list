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

  /**@function getTodos
   * 1. API에서 저장되어 있는 todo List를 가져오기(get)
   * 2. get 성공 시 가져와진 data를 todoList에 저장
   * 3. 이 함수는 화면 로딩 시 한 번만 호출
   */
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

  /**@function onCreateTodo
   * 1. submit 이벤트 발생 시 페이지 새로고침 막기
   * 2. toDo 입력란이 빈값이면 아무것도 return 하지 않는다.
   * 3. 빈값이 아니면 입력 값(todo)을 API로 전송
   * 4. API전송 성공 시 넘어오는 data를 todoList에 추가(기존List + data)
   * 5. toDo 입력란을 빈값으로 초기화
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

  /**@function onDeleteTodo
   * 1. 삭제를 원하는 todo의 id값을 이용해서 API에게 해당 todo 삭제 요청
   * 2. 삭제 성공 시 기존 todoList에서 삭제한 id에 해당하는 todo 제외시키기(filter)
   */
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

  /**@function onUpdateTodo
   * 1. 완료여부(checkbox)의 isCompleted와 수정모드에서 수정한 todo의 변경사항을 API로 전송
   * 2. API전송 성공 시 todoList에 변경사항 적용(변경된 todo의 id에 해당하는 todo만 변경, 그 외 기존유지)
   */
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

  /**@function onModifyButtonClick
   * 1. modifyObject의 값 변경
   * 2. 수정을 원하는 todo의 id에 해당하는 UI를 수정모드(input,buttonX2)로 변경하기 위함
   */
  const onModifyButtonClick = (todosItem) => {
    setModifyObject({
      todo: todosItem.todo,
      id: todosItem.id,
      flag: true
    })
  }

  /**@function initModifyObject
   * 1. modifyObject의 값 초기화
   * 2. 수정모드 UI를 원래 UI로 돌려놓기 위함
   */
  const initModifyObject = () => {
    setModifyObject({
      todo: null,
      id: null,
      flag: false
    })
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
