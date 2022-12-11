import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ReactElement } from "react";
import { LinkButton } from "../../core/buttons/LinkButton";
import { creditFormat } from "../../helpers/creditFormat";
import { numberFormat } from "../../helpers/numberFormat";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { usePlacePurchaseOrder } from "../../spacetraders-api/hooks/my/orders/usePlacePurchaseOrder";
import { Tile } from "../common/tiles/Tile";
import { IMarketplaceListingForShip } from "./BuyGoods";

interface IOwnProps {
	ship: IMyDockedShip;
	marketplaceListing: IMarketplaceListingForShip;
}

interface IBuyGoodForm {
	quantity: number | "";
}

const initialValues: IBuyGoodForm = {
	quantity: "",
};

export function BuyGood(props: IOwnProps): ReactElement {
	const placePurchaseOrder = usePlacePurchaseOrder();

	const handlePurchase = (
		values: IBuyGoodForm,
		{ setSubmitting, resetForm }: FormikHelpers<IBuyGoodForm>,
	) => {
		if (values.quantity === "") {
			setSubmitting(false);
			return;
		}

		placePurchaseOrder.mutate(
			{
				shipId: props.ship.id,
				good: props.marketplaceListing.symbol,
				quantity: values.quantity,
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

	const maxQuantity = Math.min(
		props.marketplaceListing.quantityAvailable,
		props.ship.loadingSpeed,
		Math.floor(
			props.ship.spaceAvailable / props.marketplaceListing.volumePerUnit,
		),
	);

	return (
		<Tile width="35rem">
			<h3>{t(titleCase(props.marketplaceListing.symbol))}</h3>
			<dl>
				<div>
					<dt>{t("Quantity Available")}:</dt>
					<dd>{numberFormat(props.marketplaceListing.quantityAvailable)}</dd>
				</div>
				<div>
					<dt>{t("Quantity Owned")}:</dt>
					<dd>{numberFormat(props.marketplaceListing.quantityOwned)}</dd>
				</div>
				<div>
					<dt>{t("Volume per Unit")}:</dt>
					<dd>{numberFormat(props.marketplaceListing.volumePerUnit)}</dd>
				</div>
				<div>
					<dt>{t("Purchase Price per Unit")}:</dt>
					<dd>{creditFormat(props.marketplaceListing.purchasePricePerUnit)}</dd>
				</div>
			</dl>

			<Formik<IBuyGoodForm>
				initialValues={initialValues}
				onSubmit={handlePurchase}
			>
				{({ isSubmitting, setFieldValue, values }) => (
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

						{placePurchaseOrder.error ? (
							<div>{t(placePurchaseOrder.error.message)}</div>
						) : undefined}

						<div>
							<button type="submit" disabled={isSubmitting}>
								{t("Purchase")}
							</button>{" "}
							{values.quantity !== "" &&
								values.quantity > 0 &&
								creditFormat(
									values.quantity *
										props.marketplaceListing.purchasePricePerUnit,
								)}
						</div>
					</Form>
				)}
			</Formik>
		</Tile>
	);
}
