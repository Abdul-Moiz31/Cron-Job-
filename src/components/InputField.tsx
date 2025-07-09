import React from 'react';

interface InputFieldProps {
  id?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedby?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  ariaInvalid,
  ariaDescribedby,
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    required={required}
    aria-invalid={ariaInvalid}
    aria-describedby={ariaDescribedby}
    style={{
      padding: '0.9rem',
      borderRadius: '0.6rem',
      border: '1.5px solid #bdbdbd',
      fontSize: '1.05rem',
      outline: 'none',
      transition: 'border 0.2s, box-shadow 0.2s',
      marginBottom: '0.2rem',
      boxShadow: ariaInvalid ? '0 0 0 2px #e74c3c33' : undefined,
      borderColor: ariaInvalid ? '#e74c3c' : '#bdbdbd',
    }}
    onFocus={e => (e.currentTarget.style.borderColor = '#764ba2')}
    onBlur={e => {
      e.currentTarget.style.borderColor = ariaInvalid ? '#e74c3c' : '#bdbdbd';
      onBlur && onBlur(e);
    }}
  />
);

export default InputField;