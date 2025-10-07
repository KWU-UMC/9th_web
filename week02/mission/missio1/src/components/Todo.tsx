import React, { useContext, useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TodoContext } from "../context/TodoContext";
import { useTodo } from "../context/TodoContext";

const Todo = () : Element => {


        const {todos, completeTodo, addTodo, deletTodo, doneTodos} = useTodo();

    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>Doyun Todo</h1>
            <TodoForm />
            <div className='render-container'>
                <TodoList
                title='할 일'
                todos={todos}
                buttonLabel='완료'
                buttonColor='#28a745'
                onClick={completeTodo} />
                <TodoList
                title='완료'
                todos={doneTodos}
                buttonLabel='삭제'
                buttonColor='#dc3545'
                onClick={deletTodo} />
            </div>
        </div>

    );
};

export default Todo;

