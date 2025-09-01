import { useEffect, useRef } from "react";

interface IProps<T> {
  dependency: T;
  action: () => void;
  delay: number;
}

export default function useDebouncer<T>({
  dependency,
  action,
  delay,
}: IProps<T>) {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeRef.current) clearTimeout(timeRef.current);

    const timeout = setTimeout(action, delay);
    timeRef.current = timeout;

    return () => clearTimeout(timeout);
  }, [dependency, action, delay]);
}
