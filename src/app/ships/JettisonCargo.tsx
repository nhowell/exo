import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { ReactElement } from "react";
import { LinkButton } from "../../core/buttons/LinkButton";
import { t } from "../../helpers/translate";
import { useJettisonShipCargo } from "../../spacetraders-api/hooks/my/ships/useJettisonShipCargo";
import { IMyShip, IShipCargo } from "../../spacetraders-api/api/my/ships/types";

interface IOwnProps {
	ship: IMyShip;
	cargoItem: IShipCargo;
	onCancel: () => void;
}

interface IJettisonCargoForm {
	quantity: number | "";
}

const initialValues: IJettisonCargoForm = {
	quantity: "",
};

export function JettisonCargo(props: IOwnProps): ReactElement {
	const jettisonCargo = useJettisonShipCargo(props.ship.id);

	const handleJettison = (
		values: IJettisonCargoForm,
		{ setSubmitting, resetForm }: FormikHelpers<IJettisonCargoForm>,
	) => {
		if (values.quantity === "") {
			setSubmitting(false);
			return;
		}

		jettisonCargo.mutate(
			{
				good: props.cargoItem.good,
				quantity: values.quantity,
			},
			{
				onSuccess: () => {
					resetForm();
					props.onCancel();
				},
				onSettled: () => {
					setSubmitting(false);
				},
			},
		);
	};

	const maxQuantity = props.cargoItem.quantity;

	return (
		<Formik<IJettisonCargoForm>
			initialValues={initialValues}
			onSubmit={handleJettison}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form>
					<div>
						<label htmlFor="quantity">
							{t("Quantity")}{" "}
							<small>
								<LinkButton
									onClick={() => setFieldValue("quantity", maxQuantity)}
								>
									{t("Max")}
								</LinkButton>
							</small>
						</label>
						<Field
							type="number"
							id="quantity"
							name="quantity"
							min={0}
							max={maxQuantity}
							pattern="[0-9]*"
							validate={(value: string) => {
								if (!value) {
									return t("Quantity is required.");
								}
							}}
						/>
						<ErrorMessage name="quantity" component="div" />
					</div>

					{jettisonCargo.error ? (
						<div>{t(jettisonCargo.error.message)}</div>
					) : undefined}

					<div>
						<button type="submit" disabled={isSubmitting}>
							{t("Jettison")}
						</button>{" "}
						{t("or")}{" "}
						<LinkButton onClick={props.onCancel}>{t("Cancel")}</LinkButton>
					</div>
				</Form>
			)}
		</Formik>
	);
}
