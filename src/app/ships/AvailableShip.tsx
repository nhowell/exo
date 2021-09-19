import { Formik, Form, FormikHelpers, ErrorMessage, Field } from "formik";
import { creditFormat } from "../../helpers/creditFormat";
import { numberFormat } from "../../helpers/numberFormat";
import { t } from "../../helpers/translate";
import { IAvailableShip } from "../../spacetraders-api/api/game/ships/types";
import { usePurchaseShip } from "../../spacetraders-api/hooks/my/ships/usePurchaseShip";
import { Tag } from "../common/Tag";

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
			<h3>
				{props.ship.manufacturer} {props.ship.class}{" "}
				<Tag text={props.ship.type} />
			</h3>
			<dl>
				<div>
					<dt>{t("Max Cargo")}:</dt>
					<dd>{numberFormat(props.ship.maxCargo)}</dd>
				</div>
				<div>
					<dt>{t("Speed")}:</dt>
					<dd>{numberFormat(props.ship.speed)}</dd>
				</div>
				<div>
					<dt>{t("Plating")}:</dt>
					<dd>{numberFormat(props.ship.plating)}</dd>
				</div>
				<div>
					<dt>{t("Weapons")}:</dt>
					<dd>{numberFormat(props.ship.weapons)}</dd>
				</div>
			</dl>

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
