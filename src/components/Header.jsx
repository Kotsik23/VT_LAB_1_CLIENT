import { Link, Stack, Typography, useTheme } from "@mui/material";
import { navItems } from "../utils/constants";
import { Link as NavLink } from "react-router-dom";

const Header = () => {
	const theme = useTheme();

	return (
		<Stack
			direction={"row"}
			gap={4}
			p={2}
			bgcolor={theme.palette.grey[300]}
			borderBottom={`2px solid ${theme.palette.grey[500]}`}
		>
			{navItems.map((item, idx) => (
				<Link
					component={NavLink}
					to={item.link}
					underline={"hover"}
					key={idx}
					color={"text.primary"}
				>
					<Typography variant={"h6"}>{item.name}</Typography>
				</Link>
			))}
		</Stack>
	);
};

export default Header;
