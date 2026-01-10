import type { ButtonHTMLAttributes } from 'react';

export const Button = ({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`border-(--foreground) bg-(--background) cursor-pointer border-2 px-4 py-2 font-bold uppercase tracking-wider text-[var(--foreground)] transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-[var(--glow-strong)] focus:shadow-[var(--glow-strong)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[var(--background)] disabled:hover:text-[var(--foreground)] disabled:hover:shadow-none ${className}`}
    {...props}
  />
);
