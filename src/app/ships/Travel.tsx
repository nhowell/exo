import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { ReactElement, useCallback } from "react";

import { LocationType } from "@/spacetraders-api/api/enums";
import { ILocation } from "@/spacetraders-api/api/locations/types";
import { IMyDockedShip } from "@/spacetraders-api/api/my/ships/types";
import { ISystemLocationsResponse } from "@/spacetraders-api/api/systems/types";
import { useSubmitFlightPlan } from "@/spacetraders-api/hooks/my/flight-plans/useSubmitFlightPlan";
import { useAttemptWarpJump } from "@/spacetraders-api/hooks/my/warp-jumps/useAttemptWarpJump";
import { useLocationsInSystem } from "@/spacetraders-api/hooks/systems/useLocationsInSystem";
import { splitSymbol } from "@/utils/splitSymbol";
import { t } from "@/utils/translate";

import { TransformedQueryResultHandler } from "../common/TransformedQueryResultHandler";
import { LocationMessages } from "../systems/locations/LocationMessages";

import { Destination } from "./Destination";

interface IOwnProps {
	ship: IMyDockedShip;
}

interface ISubmitFlightPlanForm {
	destination: string | null;
}

const initialValues: ISubmitFlightPlanForm = {
	destination: null,
};

export function Travel(props: IOwnProps): ReactElement {
	const attemptWarpJump = useAttemptWarpJump();

	const handleWarpJumpClick = () => {
		attemptWarpJump.mutate(props.ship.id);
	};

	const systemSymbol = splitSymbol(props.ship.location).systemSymbol;

	const result = useLocationsInSystem(systemSymbol);

	const transformData = useCallback(
		(data: ISystemLocationsResponse): ILocation[] =>
			data.locations.filter((x) => x.symbol !== props.ship.location),
		[props.ship.location],
	);

	const submitFlightPlan = useSubmitFlightPlan();

	const handleSubmit = (
		values: ISubmitFlightPlanForm,
		{ setSubmitting, resetForm }: FormikHelpers<ISubmitFlightPlanForm>,
	) => {
		if (values.destination === null) {
			setSubmitting(false);
			return;
		}

		submitFlightPlan.mutate(
			{
				shipId: props.ship.id,
				destination: values.destination,
			},
			{
				onSuccess: () => {
					resetForm();
				},
				onSettled: () => {
					setSubmitting(false);
				},
			},
		);
	};

	const origin = result.data?.locations.find(
		(x) => x.symbol === props.ship.location,
	);

	return (
		<TransformedQueryResultHandler
			queryResult={result}
			transformData={transformData}
		>
			{(destinations) =>
				destinations.length === 0 ? (
					<p>{t("No travel destinations available.")}</p>
				) : origin === undefined ? (
					<p>{t("Origin could not be determined.")}</p>
				) : (
					<>
						<LocationMessages location={origin} />
						{origin.type === LocationType.Wormhole && (
							<>
								<button type="button" onClick={handleWarpJumpClick}>
									{t("Attempt warp jump")}
								</button>
								{attemptWarpJump.isError && (
									<p>{attemptWarpJump.error.message}</p>
								)}
							</>
						)}
						<h3>{t("Destinations")}</h3>
						<Formik<ISubmitFlightPlanForm>
							initialValues={initialValues}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<div>
										{destinations.map((destination) => {
											return (
												<Destination
													key={destination.symbol}
													ship={props.ship}
													origin={origin}
													destination={destination}
												/>
											);
										})}
										<ErrorMessage name="destination" component="div" />
									</div>

									{submitFlightPlan.error ? (
										<div>{t(submitFlightPlan.error.message)}</div>
									) : undefined}

									<div>
										<button type="submit" disabled={isSubmitting}>
											{t("Submit flight plan")}
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</>
				)
			}
		</TransformedQueryResultHandler>
	);
}
