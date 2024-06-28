import { type ElementType, useEffect, useState } from "react";

interface LateralMenuItemProps {
	name: string;
	Icon: ElementType;
	isExpanded: boolean;
}

export default function LateralMenuItem({
	isExpanded,
	name,
	Icon,
}: LateralMenuItemProps) {
	return (
		<span className="flex">
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
