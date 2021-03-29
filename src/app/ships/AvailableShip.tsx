import { Formik, Form, FormikHelpers, ErrorMessage, Field } from "formik";
import { creditFormat } from "../../helpers/creditFormat";
import { numberFormat } from "../../helpers/numberFormat";
import { t } from "../../helpers/translate";
import { IAvailableShip } from "../../spacetraders-api/api/game/ships/types";
import { usePurchaseShip } from "../../spacetraders-api/hooks/users/ships/usePurchaseShip";

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

	const handlePurchase = async (
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
			<p>
				<strong>{t("Manufacturer")}:</strong> {t(props.ship.manufacturer)}
				<br />
				<strong>{t("Type")}:</strong> {t(props.ship.type)}
				<br />
				<strong>{t("Class")}:</strong> {t(props.ship.class)}
				<br />
				<strong>{t("Max Cargo")}:</strong> {numberFormat(props.ship.maxCargo)}
				<br />
				<strong>{t("Speed")}:</strong> {numberFormat(props.ship.speed)}
				<br />
				<strong>{t("Plating")}:</strong> {numberFormat(props.ship.plating)}
				<br />
				<strong>{t("Weapons")}:</strong> {numberFormat(props.ship.weapons)}
			</p>

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
