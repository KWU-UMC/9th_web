import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
    todos : TTodo[];
    doneTodos : TTodo[];
    addTodo : (text : string) => void;
    completeTodo : (todo : TTodo) => void;
    deletTodo : (todo : TTodo) => void;
    input : string;
    setInput : (input : string) => void;
    handleSubmit : (e : React.FormEvent<HTMLFormElement>) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>
(undefined);

export const TodoProvider = ({children} : PropsWithChildren) : void => {
            const [todos, setTodos] = useState<TTodo[]>([]);
            const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

            const addTodo = (text : string) : void => {
                const newTodo : TTodo = { id : Date.now(), text };
                setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]);
            };
        const completeTodo = (todo : TTodo) : void => {
            setTodos(prevTodos => prevTodos.filter((t): boolean => t.id !== todo.id));
            setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
        };
    
        const deletTodo = (todo : TTodo) : void => {
            setDoneTodos((prevDoneTodo) : TTodo[] =>
            prevDoneTodo.filter((t) : boolean => t.id !== todo.id)
            );
        };

        return (<TodoContext.Provider value={{todos, doneTodos, addTodo,
             completeTodo, deletTodo}}>{children}
             </TodoContext.Provider>);
    };


export const useTodo = () : ITodoContext => {
        const context = useContext(TodoContext);

        if (!context) {
            throw new Error('useTodo must be used within a TodoProvider');
        };
    return context;
};
