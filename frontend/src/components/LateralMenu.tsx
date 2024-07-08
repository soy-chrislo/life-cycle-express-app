import {
	ArrowLeftFromLine,
	ArrowRightFromLine,
	CalendarIcon,
	CircuitBoard,
	FolderIcon,
	Grid2X2,
	RocketIcon,
} from "lucide-react";
import { useState } from "react";
import LateralMenuItem from "./LateralMenuItem";
import {
	type DashboardPage,
	useDashboardPage,
} from "./providers/DashboardProvider";

export default function LateralMenu() {
	const { setDashboardPage } = useDashboardPage();
	const [isExpanded, setIsExpanded] = useState(false);
	const [itemSelected, setItemSelected] = useState<DashboardPage>("panel");

	const handleExpand = () => {
		const timeout = setTimeout(() => {
			setIsExpanded(!isExpanded);
		}, 200);
		return () => clearTimeout(timeout);
	};

	const handleSelection = (item: DashboardPage) => {
		setItemSelected(item);
		setDashboardPage(item);
	};

	return (
		<div
			className="border-r"
			style={{
				maxWidth: isExpanded ? "fit-content" : "100px",
				transition: "max-width 0.5s ease-out",
			}}
		>
			{/* ml-8 mr-8 */}
			<div className="mt-5 pl-5 pr-5">
				<div className="w-auto flex flex-col space-y-3">
					{isExpanded ? (
						<ArrowLeftFromLine
							onClick={handleExpand}
							className="mb-3 hover:cursor-pointer"
						/>
					) : (
						<ArrowRightFromLine
							onClick={handleExpand}
							className="mb-3 hover:cursor-pointer"
						/>
					)}
					<LateralMenuItem
						isSelected={itemSelected === "panel"}
						onClick={() => handleSelection("panel")}
						isExpanded={isExpanded}
						name="Panel"
						Icon={RocketIcon}
					/>
					<LateralMenuItem
						isSelected={itemSelected === "users"}
						onClick={() => handleSelection("users")}
						isExpanded={isExpanded}
						name="Users"
						Icon={CalendarIcon}
					/>
					<LateralMenuItem
						isSelected={itemSelected === "properties"}
						onClick={() => handleSelection("properties")}
						isExpanded={isExpanded}
						name="Properties"
						Icon={CircuitBoard}
					/>
					<LateralMenuItem
						isSelected={itemSelected === "tools"}
						onClick={() => handleSelection("tools")}
						isExpanded={isExpanded}
						name="Tools"
						Icon={FolderIcon}
					/>
					<LateralMenuItem
						isSelected={itemSelected === "services"}
						onClick={() => handleSelection("services")}
						isExpanded={isExpanded}
						name="Services"
						Icon={Grid2X2}
					/>
				</div>
			</div>
		</div>
	);
}
