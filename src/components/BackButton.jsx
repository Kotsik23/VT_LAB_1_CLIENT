import { IconButton, styled, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const StyledBackButton = styled(IconButton)(({ theme }) => ({
	height: 55,
	width: 55,
	backgroundColor: theme.palette.warning.main,
	color: theme.palette.getContrastText(theme.palette.warning.main),
	"&:hover": {
		backgroundColor: theme.palette.warning.dark,
	},
}));

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<Tooltip title={"Go back"}>
			<StyledBackButton onClick={() => navigate(-1)}>
				<ArrowBackIcon />
			</StyledBackButton>
		</Tooltip>
	);
};

export default BackButton;
