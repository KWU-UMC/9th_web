// // src/hooks/useForm.ts
// import { useState, type ChangeEvent, type FormEvent } from "react";

// interface UseFormProps<T> {
//   initialValues: T;
//   validate: (values: T) => Partial<Record<keyof T, string>>;
//   onSubmit: (values: T) => void;
// }

// export function useForm<T extends Record<string, any>>({
//   initialValues,
//   validate,
//   onSubmit,
// }: UseFormProps<T>) {
//   const [values, setValues] = useState<T>(initialValues);
//   const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
//   const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//     setTouched((prev) => ({ ...prev, [name]: true })); // ← 추가
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const v = validate(values);
//     setErrors(v);
//     if (Object.keys(v).length === 0) onSubmit(values);
//   };

//   const isValid = Object.keys(validate(values)).length === 0;

//   return { values, errors, touched, handleChange, handleSubmit, isValid }; // ← touched 반환
// }
import { useCallback, useMemo, useState } from "react";

type Validator<T> = (value: T) => string | null;

type FieldState<T> = {
  value: T;
  touched: boolean;
  error: string | null;
};

type Options<T> = {
  initial: T;
  validate: { [K in keyof T]?: Validator<T[K]>[] };
};

export function useForm<T extends Record<string, any>>({ initial, validate }: Options<T>) {
  const [fields, setFields] = useState<Record<keyof T, FieldState<any>>>(() => {
    const f = {} as Record<keyof T, FieldState<any>>;
    (Object.keys(initial) as (keyof T)[]).forEach((k) => {
      f[k] = { value: initial[k], touched: false, error: null };
    });
    return f;
  });

  const run = useCallback(
    <K extends keyof T>(k: K, v: T[K]) => {
      const rules = validate[k] ?? [];
      for (const rule of rules) {
        const msg = rule(v);
        if (msg) return msg;
      }
      return null;
    },
    [validate]
  );

  const setValue = useCallback(
    <K extends keyof T>(k: K, v: T[K]) => {
      setFields((s) => {
        const error = run(k, v);
        return { ...s, [k]: { ...s[k], value: v, error } };
      });
    },
    [run]
  );

  const setTouched = useCallback(<K extends keyof T>(k: K) => {
    setFields((s) => ({ ...s, [k]: { ...s[k], touched: true } }));
  }, []);

  const isValid = useMemo(
    () =>
      (Object.keys(fields) as (keyof T)[]).every(
        (k) => run(k, fields[k].value) === null
      ),
    [fields, run]
  );

  const values = useMemo(() => {
    const v = {} as T;
    (Object.keys(fields) as (keyof T)[]).forEach((k) => (v[k] = fields[k].value));
    return v;
  }, [fields]);

  return { fields, values, isValid, setValue, setTouched };
}
