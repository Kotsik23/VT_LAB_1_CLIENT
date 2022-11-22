import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";

const StudentPage = () => {
	const student = useLocation().state;

	return (
		<Stack>
			<BackButton />
			<Typography variant={"h5"} align={"center"}>
				Страница студента {student.name}
			</Typography>
		</Stack>
	);
};

export default StudentPage;
