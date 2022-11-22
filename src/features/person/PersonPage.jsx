import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PersonInfo from "./PersonInfo";
import Progress from "../../components/Progress";
import BackButton from "../../components/BackButton";

const PersonPage = () => {
	const [person, setPerson] = useState({});
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	useEffect(() => {
		const getPersonInfo = async (personId) => {
			setLoading(true);
			const response = await fetchData(
				`${process.env.REACT_APP_API_URL}/person/${personId}`
			);
			setPerson(response);
			setLoading(false);
		};

		getPersonInfo(id);
	}, [id]);

	let content;

	if (loading) content = <Progress />;

	if (!loading)
		content = (
			<Stack spacing={2} mb={4}>
				<BackButton />

				<Typography align={"center"} variant={"h4"}>
					Person INFO of{" "}
					<Typography
						variant={"h4"}
						color={"primary.dark"}
						fontWeight={"bold"}
						component={"span"}
					>
						{person.name}
					</Typography>
				</Typography>

				<PersonInfo person={person} />
			</Stack>
		);

	return content;
};

export default PersonPage;
