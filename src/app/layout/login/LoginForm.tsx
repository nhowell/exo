import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { IAuth } from "../../hooks/useAuth";

export interface ILoginForm extends IAuth {}

const initialValues: ILoginForm = {
	username: "",
	token: "",
};

interface IOwnProps {
	onLogin(values: ILoginForm): Promise<string | undefined>;
}

export function LoginForm(props: IOwnProps) {
	const handleLogin = async (
		values: ILoginForm,
		{ setStatus, setSubmitting }: FormikHelpers<ILoginForm>,
	) => {
		setStatus(undefined);
		const errorMessage = await props.onLogin(values);
		setStatus(errorMessage);
		setSubmitting(false);
	};

	return (
		<>
			<h1>Login</h1>

			<Formik<ILoginForm> initialValues={initialValues} onSubmit={handleLogin}>
				{({ status, isSubmitting }) => (
					<Form>
						<div>
							<label htmlFor="username">Username</label>
							<Field
								type="text"
								id="username"
								name="username"
								validate={(value: string) => {
									if (!value) {
										return "Username is required.";
									}
								}}
							/>
							<ErrorMessage name="username" component="div" />
						</div>

						<div>
							<label htmlFor="token">Token</label>
							<Field
								type="password"
								id="token"
								name="token"
								validate={(value: string) => {
									if (!value) {
										return "Token is required.";
									}
								}}
							/>
							<ErrorMessage name="token" component="div" />
						</div>

						{status ? <div>{status}</div> : undefined}

						<div>
							<button type="submit" disabled={isSubmitting}>
								Login
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
