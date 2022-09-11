import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ReactElement } from "react";
import { LinkButton } from "../../core/buttons/LinkButton";
import { creditFormat } from "../../helpers/creditFormat";
import { numberFormat } from "../../helpers/numberFormat";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { usePlaceSellOrder } from "../../spacetraders-api/hooks/my/orders/usePlaceSellOrder";
import { Tile } from "../common/tiles/Tile";
import { IMarketplaceListingForShip } from "./BuyGoods";

interface IOwnProps {
	ship: IMyDockedShip;
	marketplaceListing: IMarketplaceListingForShip;
}

interface ISellGoodForm {
	quantity: number | null;
}

const initialValues: ISellGoodForm = {
	quantity: 0,
};

export function SellGood(props: IOwnProps): ReactElement {
	const placeSellOrder = usePlaceSellOrder();

	const handleSell = (
		values: ISellGoodForm,
		{ setSubmitting, resetForm }: FormikHelpers<ISellGoodForm>,
	) => {
		if (values.quantity === null) {
			setSubmitting(false);
			return;
		}

		placeSellOrder.mutate(
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
		props.marketplaceListing.quantityOwned,
		props.ship.loadingSpeed,
	);

	return (
		<Tile width="35rem">
			<h3>{t(titleCase(props.marketplaceListing.symbol))}</h3>
			<dl>
				<div>
					<dt>{t("Quantity Owned")}:</dt>
					<dd>{numberFormat(props.marketplaceListing.quantityOwned)}</dd>
				</div>
				<div>
					<dt>{t("Volume per Unit")}:</dt>
					<dd>{numberFormat(props.marketplaceListing.volumePerUnit)}</dd>
				</div>
				<div>
					<dt>{t("Sell Price per Unit")}:</dt>
					<dd>{creditFormat(props.marketplaceListing.sellPricePerUnit)}</dd>
				</div>
			</dl>

			{props.marketplaceListing.quantityOwned > 0 && (
				<Formik<ISellGoodForm>
					initialValues={initialValues}
					onSubmit={handleSell}
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

							{placeSellOrder.error ? (
								<div>{t(placeSellOrder.error.message)}</div>
							) : undefined}

							<div>
								<button type="submit" disabled={isSubmitting}>
									{t("Sell")}
								</button>{" "}
								{values.quantity !== null &&
									values.quantity > 0 &&
									creditFormat(
										values.quantity * props.marketplaceListing.sellPricePerUnit,
									)}
							</div>
						</Form>
					)}
				</Formik>
			)}
		</Tile>
	);
}
