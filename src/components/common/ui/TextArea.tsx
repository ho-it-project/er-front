import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  error?: string;
  className?: string;
}

const TextArea = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  required,
  className,
  ...rest
}: TextAreaProps) => {
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
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`resize-none rounded-md border px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-600 ${
          error ? "border-red-500" : "border-gray-300"
        } min-h-[10rem]`}
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

export default React.memo(TextArea);
