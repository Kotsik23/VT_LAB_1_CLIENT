import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { departments } from "../utils/constants";
import { Controller } from "react-hook-form";

const DepartmentSelect = (props) => {
	return (
		<FormControl fullWidth required error={props.error}>
			<InputLabel id={"department"}>Department</InputLabel>
			<Controller
				control={props.control}
				name={"department"}
				render={({ field }) => (
					<Select labelId="department" id="department" label="Department" {...field}>
						{departments.map((department, idx) => (
							<MenuItem value={department.value} key={idx}>
								{department.name}
							</MenuItem>
						))}
					</Select>
				)}
			/>
			{props.error && <FormHelperText>{props.helperText}</FormHelperText>}
		</FormControl>
	);
};

export default DepartmentSelect;
