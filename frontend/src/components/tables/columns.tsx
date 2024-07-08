import type { Customer } from "@/constants/dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
	{
		accessorKey: "name",
		header: "NAME",
	},
	{
		accessorKey: "phoneNumber",
		header: "PHONE NUMBER",
	},
];
