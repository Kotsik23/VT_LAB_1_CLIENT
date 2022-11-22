import { forwardRef } from "react";
import { TextField } from "@mui/material";

const ControlledInput = forwardRef((props, ref) => {
	return <TextField variant={"outlined"} inputRef={ref} fullWidth {...props} />;
});

export default ControlledInput;
