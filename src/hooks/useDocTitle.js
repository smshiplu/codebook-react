import { useEffect } from "react";

export const useDocTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - CodeBook`;
  }, [title]);
  return null;
}
