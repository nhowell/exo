import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ReactElement } from "react";

import { LinkButton } from "../../../core/buttons/LinkButton";
import { Good } from "../../../spacetraders-api/api/enums";
import {
	IMyDockedShip,
	isDocked,
} from "../../../spacetraders-api/api/my/ships/types";
import { IStructure } from "../../../spacetraders-api/api/structures/types";
import { useMyShips } from "../../../spacetraders-api/hooks/my/ships/useMyShips";
import { useDepositGoodsToStructure } from "../../../spacetraders-api/hooks/structures/useDepositGoodsToStructure";
import { titleCase } from "../../../utils/titleCase";
import { t } from "../../../utils/translate";
import { useShipName } from "../../ships/useShipName";

interface IOwnProps {
	structure: IStructure;
	locationSymbol: string;
	onCancel: () => void;
}

interface IDepositGoodsForm {
	shipId: string;
	good: Good | "";
	quantity: number | "";
}

const initialValues: IDepositGoodsForm = {
	shipId: "",
	good: "",
	quantity: "",
};

export function DepositGoods(props: IOwnProps): ReactElement {
	const depositGoods = useDepositGoodsToStructure(props.structure.id);

	const handleTransfer = (
		values: IDepositGoodsForm,
		{ setSubmitting, resetForm }: FormikHelpers<IDepositGoodsForm>,
	) => {
		if (values.shipId === "" || values.good === "" || values.quantity === "") {
			setSubmitting(false);
			return;
		}

		depositGoods.mutate(
			{
				shipId: values.shipId,
				good: values.good,
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
			.filter(isDocked)
			.filter((x) => x.location === props.locationSymbol) ?? [];

	return (
		<Formik<IDepositGoodsForm>
			initialValues={initialValues}
			onSubmit={handleTransfer}
		>
			{({ isSubmitting }) => (
				<Form>
					<div>
						<label htmlFor="shipId">{t("Ship")}</label>
						<Field
							as="select"
							name="shipId"
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
						<ErrorMessage name="shipId" component="div" />
					</div>

					<div>
						<label htmlFor="good">{t("Good")}</label>
						<Field
							as="select"
							name="good"
							validate={(value: string) => {
								if (!value) {
									return t("Good is required.");
								}
							}}
						>
							<option value="">{t("Choose a good...")}</option>
							{props.structure.materials.map((material) => (
								<option key={material.good} value={material.good}>
									{t(titleCase(material.good))}
								</option>
							))}
						</Field>
						<ErrorMessage name="good" component="div" />
					</div>

					<div>
						<label htmlFor="quantity">{t("Quantity")}</label>
						<Field
							type="number"
							id="quantity"
							name="quantity"
							min={0}
							pattern="[0-9]*"
							validate={(value: string) => {
								if (!value) {
									return t("Quantity is required.");
								}
							}}
						/>
						<ErrorMessage name="quantity" component="div" />
					</div>

					{depositGoods.error ? (
						<div>{t(depositGoods.error.message)}</div>
					) : undefined}

					<div>
						<button type="submit" disabled={isSubmitting}>
							{t("Deposit goods")}
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
