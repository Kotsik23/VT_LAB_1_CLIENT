import { Button, useTheme } from "@mui/material";

const ActionButton = (props) => {
	const theme = useTheme();

	return (
		<Button
			variant={"contained"}
			{...props}
			size={"large"}
			sx={{
				width: "100%",
				bgcolor: theme.palette.warning.main,
				color: theme.palette.getContrastText(theme.palette.warning.main),
				"&:hover": {
					bgcolor: theme.palette.warning.dark,
				},
			}}
		>
			{props.children}
		</Button>
	);
};

export default ActionButton;
