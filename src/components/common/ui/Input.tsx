import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  className?: string;
}
const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  required,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-semibold text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`rounded-md border px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-600 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      <span
        style={{ height: "1.5em" }}
        className="text-sm font-semibold text-red-500"
      >
        {error}
      </span>
    </div>
  );
};

export default React.memo(Input);
