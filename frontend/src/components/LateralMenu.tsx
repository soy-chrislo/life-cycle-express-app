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

export default function LateralMenu() {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpand = () => {
		const timeout = setTimeout(() => {
			setIsExpanded(!isExpanded);
		}, 500);
		return () => clearTimeout(timeout);
	};

	return (
		<div
			className="border border-gray-100 dark:border-gray-800 h-screen"
			style={{
				maxWidth: isExpanded ? "200px" : "100px",
				transition: "max-width 0.5s ease-out",
			}}
		>
			<div className="mt-20 ml-8 mr-8">
				<div className="flex flex-col space-y-6">
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
						isExpanded={isExpanded}
						name="Panel"
						Icon={RocketIcon}
					/>
					<LateralMenuItem
						isExpanded={isExpanded}
						name="Users"
						Icon={CalendarIcon}
					/>
					<LateralMenuItem
						isExpanded={isExpanded}
						name="Properties"
						Icon={CircuitBoard}
					/>
					<LateralMenuItem
						isExpanded={isExpanded}
						name="Tools"
						Icon={FolderIcon}
					/>
					<LateralMenuItem
						isExpanded={isExpanded}
						name="Services"
						Icon={Grid2X2}
					/>
				</div>
			</div>
		</div>
	);
}
