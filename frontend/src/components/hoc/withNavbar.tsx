import NavigationBar from "../NavigationBar";

const withNavigationBar = (Component: React.ComponentType) => {
	return () => {
		return (
			<>
				<NavigationBar />
				<Component />
			</>
		);
	};
};

export default withNavigationBar;
