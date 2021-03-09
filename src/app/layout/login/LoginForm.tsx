import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { IAuthStorage } from "../../hooks/useAuth";
import styles from "./LoginForm.module.css";

export interface ILoginForm extends IAuthStorage {
	rememberMe: boolean;
}

const initialValues: ILoginForm = {
	username: "",
	token: "",
	rememberMe: false,
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

						<div>
							<label>
								<Field type="checkbox" name="rememberMe" />
								Remember Me
							</label>
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

			<p className={styles.info}>
				Your token is only used to communicate with the SpaceTraders API. If you
				choose "Remember Me", your username and token will be stored in
				LocalStorage.
			</p>
		</>
	);
}
