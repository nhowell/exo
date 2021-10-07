import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ReactElement, useMemo } from "react";
import { splitSymbol } from "../../helpers/splitSymbol";
import { t } from "../../helpers/translate";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { useSubmitFlightPlan } from "../../spacetraders-api/hooks/my/flight-plans/useSubmitFlightPlan";
import { useLocationsInSystem } from "../../spacetraders-api/hooks/systems/useLocationsInSystem";
import { Tag } from "../common/Tag";

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
	const systemSymbol = splitSymbol(props.ship.location).systemSymbol;

	const { isLoading, isError, error, data } =
		useLocationsInSystem(systemSymbol);

	const destinations = useMemo(
		() => data?.locations.filter((x) => x.symbol !== props.ship.location) ?? [],
		[data?.locations, props.ship.location],
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

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : destinations.length === 0 ? (
		<p>{t("No travel destinations available.")}</p>
	) : (
		<>
			<h3>Destinations</h3>
			<Formik<ISubmitFlightPlanForm>
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div>
							{destinations.map((destination) => {
								return (
									<label key={destination.symbol}>
										<Field
											type="radio"
											name="destination"
											value={destination.symbol}
											validate={(value: string | null) => {
												if (value === null) {
													return t("Please choose a destination.");
												}
											}}
										/>
										{destination.name} <Tag text={destination.symbol} />
									</label>
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
	);
}
