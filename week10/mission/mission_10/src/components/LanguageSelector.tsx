import { type ChangeEvent, memo } from 'react';
import SelectBox from './SelectBox';

interface LanguageSelectorProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const LANGUAGES = [
  { value: 'ko-KR', label: '한국어' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '日本語' },
];

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <SelectBox
      label="언어"
      options={LANGUAGES}
      value={value}
      onChange={onChange}
    />
  );
};

export default memo(LanguageSelector);