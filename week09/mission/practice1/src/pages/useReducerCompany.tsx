import { useReducer, useState, type ChangeEvent } from "react";

interface IState {
    department: string;
    error: string|null;
}

interface IAction {
    type: "CHANGE_DEPARTMENT" | "RESET";
    payload?: string;
}

function reducer(state:IState, action:IAction){
    const { type, payload } = action;

    switch(type){
        case 'CHANGE_DEPARTMENT':{
            const newDepartment  = payload;
            const hasError = newDepartment !== '카드메이커';
            return{
                ...state,
                department: hasError? state.department: newDepartment,
                error: hasError? '거부권 행사 가능': null,
            }
        }
        default:
            return state;
    }
}

const UseReducerCompany = () => {
    const [state, dispatch] = useReducer(reducer, {
        department: 'Software Developer',
        error: null,
    })

    const [department, setDepartment] = useState('');

    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) =>{
        setDepartment(e.target.value);
    }

    return (
    <div>
      <h1>{state.department}</h1>
      {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}
      
      <input placeholder="변경할 직무를 입력하세요" value={department} onChange={handleChangeDepartment} />
      <button onClick={() => dispatch({
        type: 'CHANGE_DEPARTMENT',
        payload: department,
      })}>직무 변경하기</button>
    </div>
  );
};

export default UseReducerCompany;