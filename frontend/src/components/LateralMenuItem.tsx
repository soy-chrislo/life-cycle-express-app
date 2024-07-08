import type { ElementType } from "react";

interface LateralMenuItemProps {
	name: string;
	Icon: ElementType;
	isExpanded: boolean;
	isSelected?: boolean;
	onClick?: () => void;
}

export default function LateralMenuItem({
	isExpanded,
	name,
	Icon,
	onClick,
	isSelected,
}: LateralMenuItemProps) {
	return (
		// El w se puede mejorar por que el contenedor maxWidth: isExpanded ? "400px" : "100px", se puede settear siempre al máximo.
		<span
			onClick={onClick}
			onKeyDown={onClick}
			className={`flex p-2 hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900 rounded-md ${isSelected ? "bg-gray-100 dark:bg-gray-900" : null} ${isExpanded ? "w-48" : "w-auto"}`}
		>
			<Icon
				className={`${isExpanded ? "mr-5" : null}`}
				style={{ minWidth: "30" }}
			/>
			<p
				style={{
					visibility: isExpanded ? "visible" : "hidden",
					opacity: isExpanded ? 1 : 0,
					transition: "opacity 1s ease-out",
				}}
			>
				{isExpanded ? name : ""}
			</p>
		</span>
	);
}
