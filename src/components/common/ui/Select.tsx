import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  error?: string;
  className?: string;
}

const Select = ({
  label,
  name,
  value,
  onChange,
  error,
  children,
  disabled,
  required,
  className,
  ...rest
}: SelectProps) => {
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`rounded-md border px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-600 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      >
        {children}
      </select>
      <span
        style={{ height: "1.5em" }}
        className="text-sm font-semibold text-red-500"
      >
        {error}
      </span>
    </div>
  );
};

export default React.memo(Select);
