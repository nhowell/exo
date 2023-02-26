import { Formik, Form, FormikHelpers, ErrorMessage, Field } from "formik";
import { creditFormat } from "../../utils/creditFormat";
import { t } from "../../utils/translate";
import { IAvailableShip } from "../../spacetraders-api/api/systems/types";
import { usePurchaseShip } from "../../spacetraders-api/hooks/my/ships/usePurchaseShip";
import { Tag } from "../common/Tag";
import { ShipAttributes } from "../ships/ShipAttributes";

interface IOwnProps {
	ship: IAvailableShip;
}

interface IPurchaseShipForm {
	location: string | null;
}

const initialValues: IPurchaseShipForm = {
	location: null,
};

export function AvailableShip(props: IOwnProps) {
	const purchaseShip = usePurchaseShip();

	const handlePurchase = (
		values: IPurchaseShipForm,
		{ setSubmitting, resetForm }: FormikHelpers<IPurchaseShipForm>,
	) => {
		if (values.location === null) {
			setSubmitting(false);
			return;
		}

		purchaseShip.mutate(
			{
				location: values.location,
				type: props.ship.type,
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

	return (
		<>
			<h3>
				{props.ship.manufacturer} {props.ship.class}{" "}
				<Tag text={props.ship.type} />
			</h3>

			<ShipAttributes ship={props.ship} />

			<Formik<IPurchaseShipForm>
				initialValues={initialValues}
				onSubmit={handlePurchase}
			>
				{({ isSubmitting }) => (
					<Form>
						<div>
							{props.ship.purchaseLocations.map((purchaseLocation) => {
								return (
									<label key={purchaseLocation.location}>
										<Field
											type="radio"
											name="location"
											value={purchaseLocation.location}
											validate={(value: string | null) => {
												if (value === null) {
													return t("Please choose a location.");
												}
											}}
										/>
										{creditFormat(purchaseLocation.price)} at{" "}
										{purchaseLocation.location}
									</label>
								);
							})}
							<ErrorMessage name="location" component="div" />
						</div>

						{purchaseShip.error ? (
							<div>{t(purchaseShip.error.message)}</div>
						) : undefined}

						<div>
							<button type="submit" disabled={isSubmitting}>
								{t("Purchase")}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
