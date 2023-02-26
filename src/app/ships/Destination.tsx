import { Field } from "formik";
import { ReactElement } from "react";

import { ILocation } from "@/spacetraders-api/api/locations/types";
import { IMyDockedShip } from "@/spacetraders-api/api/my/ships/types";
import { calculateFlightSecondsForFlightPlan } from "@/utils/calculateFlightSecondsForFlightPlan";
import { calculateFuelCostForFlightPlan } from "@/utils/calculateFuelCostForFlightPlan";
import { durationFormat } from "@/utils/durationFormat";
import { t } from "@/utils/translate";

import { Tag } from "../common/Tag";

interface IOwnProps {
	ship: IMyDockedShip;
	origin: ILocation;
	destination: ILocation;
}

export function Destination(props: IOwnProps): ReactElement {
	const duration = calculateFlightSecondsForFlightPlan(
		props.ship,
		props.origin,
		props.destination,
	);

	const fuelCost = calculateFuelCostForFlightPlan(
		props.ship,
		props.origin,
		props.destination,
	);

	return (
		<label>
			<Field
				type="radio"
				name="destination"
				value={props.destination.symbol}
				validate={(value: string | null) => {
					if (value === null) {
						return t("Please choose a destination.");
					}
				}}
			/>
			{props.destination.name} <Tag text={props.destination.symbol} />{" "}
			<small>
				{t("Fuel:")} {fuelCost}
			</small>
			, <small>{durationFormat(duration)}</small>
		</label>
	);
}
