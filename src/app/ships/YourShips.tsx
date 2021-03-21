import { sum } from "lodash";
import { Table } from "../../core/table/Table";
import { ITableColumnHeader } from "../../core/table/types";
import { t } from "../../helpers/translate";
import { useShips } from "../../spacetraders-api/users/ships/getShips";
import { Good, IUserShip } from "../../spacetraders-api/users/ships/types";
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
		customFormat: (ship) => {
			const volumelessCargoCount = sum(
				ship.cargo.filter((x) => x.totalVolume === 0).map((x) => x.quantity),
			);
			const extraCargo =
				volumelessCargoCount > 0 ? ` +${volumelessCargoCount}` : "";

			return `${ship.maxCargo - ship.spaceAvailable}/${
				ship.maxCargo
			}${extraCargo}`;
		},
	},
	{
		keyname: "speed",
		label: "Speed",
		align: "right",
	},
	{
		keyname: "cargo",
		label: "Fuel",
		align: "right",
		customFormat: (ship) =>
			ship.cargo.find((x) => x.good === Good.Fuel)?.quantity ?? 0,
	},
	{
		keyname: "location",
		label: "Current Location",
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
