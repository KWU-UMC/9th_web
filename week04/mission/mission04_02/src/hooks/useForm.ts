import { useState } from "react";

type ValidationMap<T> = Partial<Record<keyof T, (value: string, all: T) => string | null>>;

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validations: ValidationMap<T> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (validations[name]) {
      const msg = validations[name]!(value, { ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: msg || "" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField(name as keyof T, value);
  };

  const validateAll = (): boolean => {
    let ok = true;
    const next: Partial<Record<keyof T, string>> = {};
    for (const key in validations) {
      const vfn = validations[key];
      if (vfn) {
        const msg = vfn(values[key], values);
        if (msg) {
          next[key] = msg;
          ok = false;
        }
      }
    }
    setErrors(next);
    return ok;
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setField,
    validateAll,
  } as const;
}
