import { Table } from "../../core/table/Table";
import { ITableColumnHeader } from "../../core/table/types";
import { t } from "../../helpers/translate";
import { useShips } from "../../spacetraders-api/users/ships/getShips";
import { IUserShip } from "../../spacetraders-api/users/ships/types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { ShipStatus } from "./ShipStatus";

const columnDefinitions: ITableColumnHeader<IUserShip>[] = [
	{
		keyname: "type",
		label: "Type",
	},
	{
		keyname: "spaceAvailable",
		label: "Cargo",
		customFormat: (item) =>
			`${item.maxCargo - item.spaceAvailable}/${item.maxCargo}`,
	},
	{
		keyname: "speed",
		label: "Speed",
		align: "right",
	},
	{
		keyname: "location",
		label: "Status",
		customElementFormat: (ship) => (
			<ShipStatus location={ship.location} flightPlanId={ship.flightPlanId} />
		),
	},
];

export function YourShips() {
	const currentUser = useCurrentUser();

	const { isLoading, isError, error, data: ships } = useShips(
		currentUser.username,
	);

	return (
		<>
			<h1>Your Ships</h1>
			<Table<IUserShip>
				keyField="id"
				striped
				columnDefinitions={columnDefinitions}
				tableData={ships ?? []}
				noTableDataMessage={t("You don't own any ships.")}
				loading={isLoading}
				errorMessage={
					isError ? t(error?.message ?? "Something went wrong.") : undefined
				}
			/>
		</>
	);
}
