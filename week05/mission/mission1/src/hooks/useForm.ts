import { useState } from "react";

interface UseFormResult {
  values: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
  touched: {
    email: boolean;
    password: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

function useForm(): UseFormResult {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // 이메일 유효성
  const validateEmail = (email: string): string => {
    if (!email) return "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "올바른 이메일 형식이 아닙니다.";
    }
    return "";
  };

  // 비밀번호 유효성
  const validatePassword = (password: string): string => {
    if (!password) return "";

    if (password.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }
    if (password.length > 16) {
      return "비밀번호는 16자 이하여야 합니다.";
    }
    return "";
  };

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 유효성 검사
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 포커스 아웃 처리
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // 전체 유효성 검사
  const isValid =
    values.email !== "" &&
    values.password !== "" &&
    errors.email === "" &&
    errors.password === "";

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
  };
}

export default useForm;
