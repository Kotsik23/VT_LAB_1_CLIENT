import { createContext, useContext, useState } from "react";

const SnackContext = createContext(undefined);

export const SnackProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [severity, setSeverity] = useState("success");
	const [text, setText] = useState("");

	const handleOpen = (severity, text) => {
		setText(text);
		setSeverity(severity);
		setIsOpen(true);
	};

	return (
		<SnackContext.Provider value={{ severity, isOpen, text, handleOpen, setIsOpen }}>
			{children}
		</SnackContext.Provider>
	);
};

export const useSnack = () => useContext(SnackContext);
