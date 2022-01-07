import React, {useReducer, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i=1; i<=2500; i++){
    array.push(
      {
        id:i,
        text: `할 일 ${i}`,
        checked: false
      }
    );
  }
  return array;
}

function todoReducer(todos, action){
  switch (action.type){
    case 'INSERT': // 새로 추가
      // {type: 'INSERT', todo: {id:1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // {type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // {type:'TOGGLE', id: 1}
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo
      )
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고유값으로 사용될 id
  // id는 렌더링 되는 정보가 아님. 화면에 보이지도 않고, 바뀐다고 리렌더링될 필요가 없음.
  // 새로운 항복을 만들 때 참조되는 값일 뿐.
  // 따라서 ref를 사용.
  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    }
    dispatch({type: 'INSERT', todo});
    nextId.current +=1;
  }, []);

  const onRemove = useCallback(
    id => {
      dispatch({type: 'REMOVE', id});
    }, []
  );

  const onToggle = useCallback(
    id => {
      dispatch({type:'TOGGLE', id});
    }, []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  )
};

export default App;