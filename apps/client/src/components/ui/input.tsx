import type { InputHTMLAttributes } from 'react';

export const Input = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`border-2 border-[var(--foreground)] bg-[var(--input)] px-3 py-2 font-mono tracking-wide text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-30 ${className}`}
    {...props}
  />
);
