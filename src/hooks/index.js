import { useContext, useEffect } from "react";
import { ThemeContext, ToastContext } from "../contexts";

export const useToast = () => useContext(ToastContext);

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return theme;
};
