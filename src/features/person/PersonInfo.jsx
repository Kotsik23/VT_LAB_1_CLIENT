import { Stack, styled, Typography } from "@mui/material";

const MarkedField = styled("span")(({ theme }) => ({
	color: theme.palette.primary.dark,
	fontSize: 22,
}));

const CustomText = styled(Typography)(({ theme }) => ({
	fontSize: 22,
}));

const PersonInfo = ({ person }) => {
	return (
		<Stack sx={{ border: "1px solid grey", borderRadius: 2 }} p={2} spacing={0.7}>
			<CustomText>
				Name: <MarkedField>{person.name}</MarkedField>
			</CustomText>
			<CustomText>
				Position: <MarkedField>{person.position}</MarkedField>
			</CustomText>
			<CustomText>
				Department: <MarkedField>{person.department}</MarkedField>
			</CustomText>
			<CustomText>
				PhoneNumber: <MarkedField>{person.phoneNumber}</MarkedField>
			</CustomText>
			<CustomText>
				Gender: <MarkedField>{person.gender}</MarkedField>
			</CustomText>
			<CustomText>
				Email: <MarkedField>{person.email}</MarkedField>
			</CustomText>
			{person.comment && (
				<CustomText>
					Comment: <MarkedField>{person.comment}</MarkedField>
				</CustomText>
			)}
			<CustomText>
				Created At:{" "}
				<MarkedField>{new Date(person.createdAt).toLocaleString()}</MarkedField>
			</CustomText>
			<CustomText>
				Updated At:{" "}
				<MarkedField>{new Date(person.updatedAt).toLocaleString()}</MarkedField>
			</CustomText>
		</Stack>
	);
};

export default PersonInfo;
