import { type ComponentType, createElement, useEffect, useState } from "react";
import LateralMenu from "../LateralMenu";
import NavigationBar from "../NavigationBar";
import { Button } from "../ui/button";

function withMenus(Component: ComponentType) {
	function WrappedComponent() {
		const [isCollapsed, setIsCollapsed] = useState(false);

		const toggleMenu = () => {
			setIsCollapsed(!isCollapsed);
		};

		useEffect(() => {
			console.log({ isCollapsed });
		}, [isCollapsed]);

		return (
			<>
				<NavigationBar />
				<div className="flex relative z-10">
					<LateralMenu /> {/* mt-14 */}
					<Component /> {/* mt-14 */}
				</div>
			</>
		);
	}
	return createElement(WrappedComponent);
}

export default withMenus;
