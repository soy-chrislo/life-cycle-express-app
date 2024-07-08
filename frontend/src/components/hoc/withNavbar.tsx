import NavigationBar from "../NavigationBar";

const withNavigationBar = (Component: React.ComponentType) => {
	return () => {
		return (
			<div className="relative">
				<NavigationBar />
				<Component />
			</div>
		);
	};
};

export default withNavigationBar;
