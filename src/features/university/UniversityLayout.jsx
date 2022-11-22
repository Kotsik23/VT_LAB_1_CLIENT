import { Link as NavLink, Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ActionButton from "../../components/ActionButton";
import SchoolIcon from "@mui/icons-material/School";

const UniversityLayout = () => {
	return (
		<Stack mt={3} gap={5}>
			<Typography variant={"h3"} component={"h2"} align={"center"}>
				Добро пожаловать на страницу Университета
			</Typography>
			<Stack direction={"row"} gap={5}>
				<ActionButton
					endIcon={<SchoolIcon />}
					component={NavLink}
					to={"/university/view"}
				>
					Посмотреть структуру университета
				</ActionButton>
			</Stack>
			<Outlet />
		</Stack>
	);
};

export default UniversityLayout;
