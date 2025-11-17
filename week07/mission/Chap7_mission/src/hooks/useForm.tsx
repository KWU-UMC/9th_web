import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: '', password: ''}
  // 값이 올바른지 검증
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue); // 폼 입력값
  const [touched, setTouched] = useState<Record<string, boolean>>(); // 입력한적이 있는지
  const [errors, setErrors] = useState<Record<string, string>>(); // validate 함수가 반환한 에러 메시지

  // 사용자가 입력값을 바꿀 때 실행
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 기존값 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직 실행
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
