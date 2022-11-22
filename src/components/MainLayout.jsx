import Header from "./Header";
import { Outlet } from "react-router-dom";
import MainContainer from "./MainContainer";

const MainLayout = () => {
	return (
		<>
			<Header />
			<MainContainer>
				<Outlet />
			</MainContainer>
		</>
	);
};

export default MainLayout;
