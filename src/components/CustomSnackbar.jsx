import { Alert, Snackbar } from "@mui/material";
import { useSnack } from "../context/SnackContext";

const CustomSnackbar = () => {
	const { isOpen, severity, text, setIsOpen } = useSnack();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setIsOpen(false);
	};

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={5000}
			anchorOrigin={{ horizontal: "right", vertical: "top" }}
			onClose={handleClose}
		>
			<Alert variant={"filled"} severity={severity}>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
