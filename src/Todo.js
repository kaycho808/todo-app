import React, {useState} from 'react';

const Todo = () => {
    const [todos, setTodos] = useState(
        [
            {id:1, text:'리액트의 기초 알아보기'}
        ]
    );
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(2);

    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextTodos = todos.concat({id:nextId, text:inputText});
        setNextId(nextId+1);
        setTodos(nextTodos);
        setInputText('');
    };
    const onRemove = (id) => () => {
        const nextTodos = todos.filter(todo => todo.id !== id);
        setTodos(nextTodos);
    };

    const onKeyPress = e => {
        if(e.key === 'Enter'){
            onClick();
        }
    };

    const TodosList = todos.map(todo => (
        <li key={todo.id}>
            {todo.text}
            <button onClick={onRemove(todo.id)}>제거</button>
            {/* <button onClick={() => onRemove(todo.id)}>제거</button> */}
        </li>
    ));


    return (
        <div>
            <h1>일정 관리</h1>
            <input value={inputText} onChange={onChange} placeholder="할 일을 입력하세요" onKeyPress={onKeyPress}/>
            <button onClick={onClick}>추가</button>
            <ul>{TodosList}</ul>
        </div>
    )
};
export default Todo;