import { useReducer, useState } from "react";

interface IState {
    counter: number;
}

interface IAction {
    type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
    payload: number;
}

function reducer(state:IState, action: IAction) {
    const { type, payload } = action;
    switch(type) {
        case 'INCREASE':{
                return {
                    ...state,
                    counter: state.counter + payload,
            }
        }
        case 'DECREASE':{
                return {
                    ...state,
                    counter: state.counter - payload,
            }
        }
        case 'RESET_TO_ZERO':{
                return {
                    ...state,
                    counter: 0,
            }
        }
        default:
            return state;
    }
}

const UseReducerPage = () => {
    const [count, setCount] = useState(0);
    const handleIncrease = () =>{
        setCount(count + 1);
    }

    const [state, dispatch] = useReducer(reducer, {
        counter: 0,       
    })

  return (
    <div className="gap-10">
        <div>
            <h2>useState훅 사용 : {count}</h2>
            <button onClick={handleIncrease}>Increase</button>
        </div>
        <div>
            <h2>useReducer훅 사용 : {state.counter}</h2>
            <button onClick={() => dispatch({
                type : 'INCREASE',
                payload: 3,
            })}>Increase</button>
            <button onClick={() => dispatch({
                type : 'DECREASE',
                payload: 3,
            })}>Decrease</button>
            <button onClick={() => dispatch({
                type : 'RESET_TO_ZERO',
                payload: 3,
            })}>RESET_TO_ZERO</button>
        </div>
    
    </div>
  );
};

export default UseReducerPage;