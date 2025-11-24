import { useReducer, useState } from "react";

interface State {
  department: string;
  error: string | null;
}

type Action = {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
};

const initialState: State = {
  department: "Software Student",
  error: null,
};

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError ? "거부권 행사 가능, 카드메이커만 입력 가능합니다." : null,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const UseReducerCompany = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1> {state.department}</h1>
      {state.error && <p className="text-red-600 font-2xl">{state.error}</p>}
      <input
        className="w-[700px] border-2 border-gray-300 rounded-md p-2 m-2"
        placeholder="변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
        type="text"
        value={department}
        onChange={handleChangeDepartment}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={(): void =>
          dispatch({ type: "CHANGE_DEPARTMENT", payload: department })
        }
      >
        직무 변경
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
        onClick={(): void => dispatch({ type: "RESET" })}
      >
        초기화
      </button>
    </div>
  );
};
