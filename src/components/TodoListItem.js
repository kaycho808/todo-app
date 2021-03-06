import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

const VirtualizedTodoListItem = styled.div`
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const StyledTodoListItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  /* &:nth-child(even) {
    background: #f8f9fa;
  } */

  .checkbox {
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
    svg {
      /* 아이콘 */
      font-size: 1.5rem;
    }
    .text {
      margin-left: 0.5rem;
      flex: 1;
    }
    &.checked {
      svg {
        color: #22b8cf;
      }
      .text {
        color: #adb5bd;
        text-decoration: line-through;
      }
    }
  }

  .remove {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover {
      color: #ff8787;
    }
  }

  /* & + & {
    border-top: 1px solid #dee2e6;
  } */
`;

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;
  return (
    <VirtualizedTodoListItem style={style}>
      <StyledTodoListItem>
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </StyledTodoListItem>
    </VirtualizedTodoListItem>
  );
};

export default React.memo(TodoListItem);
