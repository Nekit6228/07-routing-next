'use client';

import css from '@/components/Error/Error.module.css';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.overlay}>
      <div className={css.errorBox}>
        <p>{error.message}</p>
        <button onClick={reset} className={css.retryButton}>
          Retry
        </button>
      </div>
    </div>
  );
}