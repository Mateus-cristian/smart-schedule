import { useEffect, useState } from "react";

/**
 * useDebouncedValue
 * Retorna o valor apenas após o delay de inatividade.
 * @param value Valor a ser "debounced"
 * @param delay Delay em ms
 */
export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
