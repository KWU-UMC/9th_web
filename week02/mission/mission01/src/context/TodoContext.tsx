/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
    todos:TTodo[];
    donetodos:TTodo[];
    handleAdd: (text:string) =>void;
    handleComplete: (todo:TTodo) => void;
    handleDelete: (todo:TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider =({children}:{children:ReactNode}) =>{
    const [todos,setTodos]=useState<TTodo[]>([]);
    const [donetodos,setDoneTodos]=useState<TTodo[]>([]);

    const handleAdd = (text:string) => {
        const newTodo : TTodo = {id:Date.now(), text:text}
        setTodos((prevTodos):TTodo[]=>[...prevTodos,newTodo]);
    };

    const handleComplete = (todo:TTodo) => {
        setTodos(prevTodos=>prevTodos.filter((t)=>t.id!==todo.id));
        setDoneTodos((prevDoneTodos):TTodo[]=>[...prevDoneTodos,todo]);
    };

    const handleDelete = (todo:TTodo) => {
        setDoneTodos(prevTodos=>prevTodos.filter((t)=>t.id!==todo.id));
    };

    return (
        <TodoContext.Provider value={{todos, donetodos,handleAdd,handleComplete,handleDelete}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () :ITodoContext => {
    const context = useContext(TodoContext);
    if(!context)
    {
        throw new Error('useTodo 사용을 위해선 TodoProvider로 감싸야 합니다.');
    }
    return context;
};