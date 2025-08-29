import type { InputHTMLAttributes } from "react";

interface InputWithErrorProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputWithError({
  label,
  id,
  type = "text",
  error,
  ...props
}: InputWithErrorProps) {
  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...props} />
      <span
        className="text-xs text-red-600 absolute left-0 -bottom-5 min-h-0 w-full pointer-events-none"
        style={{ minHeight: "0", height: "1.25rem" }}
      >
        {error}
      </span>
    </div>
  );
}
