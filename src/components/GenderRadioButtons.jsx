import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { genders } from "../utils/constants";

const GenderRadioButtons = (props) => {
	return (
		<FormControl required fullWidth error={props.error}>
			<FormLabel id="gender">Gender</FormLabel>
			<Controller
				control={props.control}
				name={"gender"}
				render={({ field }) => (
					<RadioGroup aria-labelledby="gender" name="gender" {...field} row>
						{genders.map((gender) => (
							<FormControlLabel
								key={gender.value}
								control={<Radio />}
								label={gender.label}
								value={gender.value}
							/>
						))}
					</RadioGroup>
				)}
			/>
			{props.error && <FormHelperText>{props.helperText}</FormHelperText>}
		</FormControl>
	);
};

export default GenderRadioButtons;
