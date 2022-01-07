import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

const Form = styled.form`
  display: flex;
  background: #495057;
  input {
    /* 기본 스타일 초기화 */
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder {
      color: #dee2e6;
    }
    /* 버튼을 제외한 영역을 모두 차지하기 */
    flex: 1;
  }
  button {
    /* 기본 스타일 초기화 */
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
`;
const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');
      // submit 이벤트는 브라우저에서 새로고침을 발생시키므로, 이를 방지하기 위해 아래 함수 호출.
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <Form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </Form>
  );
};
export default TodoInsert;
