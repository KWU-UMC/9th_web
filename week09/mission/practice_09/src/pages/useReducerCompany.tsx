import { useReducer, useState, type ChangeEvent } from "react";

interface State {
  department: string;
  error: string | null;
}

interface Action {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

const ALLOWED = "카드메이커";
const ERROR_TEXT = "거부권 행사 가능";
const PLACEHOLDER_TEXT =
  "변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능";
const LABEL_CHANGE = "직무 변경";
const LABEL_RESET = "초기화";

const initialState: State = {
  department: "Software Student",
  error: null,
};

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = (payload ?? "").trim();
      const allowed = newDepartment === ALLOWED;

      return {
        ...state,
        department: allowed && newDepartment ? newDepartment : state.department,
        error: allowed ? null : ERROR_TEXT,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const UseReducerCompany = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({
      type: "CHANGE_DEPARTMENT",
      payload: department,
    });
  };

  const handleReset = () => {
    setDepartment("");
    dispatch({ type: "RESET" });
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">
          {state.department}
        </h1>

        <div className="controls">
          <input
            className="job-input"
            placeholder={PLACEHOLDER_TEXT}
            value={department}
            onChange={handleChangeDepartment}
          />
          <button className="btn primary" type="button" onClick={handleSubmit}>
            {LABEL_CHANGE}
          </button>
          <button className="btn secondary" type="button" onClick={handleReset}>
            {LABEL_RESET}
          </button>
        </div>

        {state.error && <p className="error">{state.error}</p>}
      </div>
    </div>
  );
};

export default UseReducerCompany;
