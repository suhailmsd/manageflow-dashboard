import { useContext } from "react";
import { ToastContext } from "../Contexts";

export const useToast = () => useContext(ToastContext);