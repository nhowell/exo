import { FormikHelpers, Formik, Form, Field, ErrorMessage } from "formik";
import { ReactElement } from "react";

import { LinkButton } from "@/core/buttons/LinkButton";
import {
	IMyDockedShip,
	isDocked,
	IShipCargo,
} from "@/spacetraders-api/api/my/ships/types";
import { useMyShips } from "@/spacetraders-api/hooks/my/ships/useMyShips";
import { useTransferShipCargo } from "@/spacetraders-api/hooks/my/ships/useTransferShipCargo";
import { t } from "@/utils/translate";

import { useShipName } from "./useShipName";

interface IOwnProps {
	ship: IMyDockedShip;
	cargoItem: IShipCargo;
	onCancel: () => void;
}

interface ITransferCargoForm {
	toShipId: string;
	quantity: number | "";
}

const initialValues: ITransferCargoForm = {
	toShipId: "",
	quantity: "",
};

export function TransferCargo(props: IOwnProps): ReactElement {
	const transferCargo = useTransferShipCargo(props.ship.id);

	const handleTransfer = (
		values: ITransferCargoForm,
		{ setSubmitting, resetForm }: FormikHelpers<ITransferCargoForm>,
	) => {
		if (values.toShipId === "" || values.quantity === "") {
			setSubmitting(false);
			return;
		}

		transferCargo.mutate(
			{
				toShipId: values.toShipId,
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

	const shipsResult = useMyShips();

	const availableShips: IMyDockedShip[] =
		shipsResult.data?.ships
			.filter((x) => x.id !== props.ship.id)
			.filter(isDocked)
			.filter((x) => x.location === props.ship.location) ?? [];

	const maxQuantity = props.cargoItem.quantity;

	return (
		<Formik<ITransferCargoForm>
			initialValues={initialValues}
			onSubmit={handleTransfer}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form>
					<div>
						<label htmlFor="toShipId">{t("Ship")}</label>
						<Field
							as="select"
							name="toShipId"
							validate={(value: string) => {
								if (!value) {
									return t("Ship is required.");
								}
							}}
						>
							<option value="">
								{availableShips.length > 0
									? t("Choose a ship...")
									: t("No available ships...")}
							</option>
							{availableShips.map((ship) => (
								<ShipSelectOption key={ship.id} ship={ship} />
							))}
						</Field>
						<ErrorMessage name="toShipId" component="div" />
					</div>
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

					{transferCargo.error ? (
						<div>{t(transferCargo.error.message)}</div>
					) : undefined}

					<div>
						<button type="submit" disabled={isSubmitting}>
							{t("Transfer")}
						</button>{" "}
						{t("or")}{" "}
						<LinkButton onClick={props.onCancel}>{t("Cancel")}</LinkButton>
					</div>
				</Form>
			)}
		</Formik>
	);
}

interface IShipSelectOptionProps {
	ship: IMyDockedShip;
}

function ShipSelectOption(props: IShipSelectOptionProps): ReactElement {
	const name = useShipName(props.ship.id);

	return <option value={props.ship.id}>{name}</option>;
}
