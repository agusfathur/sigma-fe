//* PRODUCTION

// "use client";
// import { useEffect, useState } from "react";

// interface LocalStorageProps<T> {
//   key: string;
//   defaultValue: T;
// }

// export default function useLocalStorage<T>({
//   key,
//   defaultValue,
// }: LocalStorageProps<T>) {
//   const [value, setValue] = useState<T>(() => {
//     // Check if the key exists in localStorage
//     if (typeof window !== "undefined") {
//       const storedValue = localStorage.getItem(key);
//       return storedValue !== null
//         ? (JSON.parse(storedValue) as T)
//         : defaultValue;
//     } else {
//       return defaultValue;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue] as const;
// }

//! DEVELOPMENT
"use client";
import { useEffect, useState } from "react";

interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
