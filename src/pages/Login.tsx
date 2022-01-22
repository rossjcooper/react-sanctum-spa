import React, { useContext, useRef, useState } from "react";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import Error from "../components/Error";
import logo from "../img/logo.png";
import { attemptLogin } from "../services/auth";
import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const rules = yup.object({
	email: yup.string().label('Email').email().required(),
	password: yup.string().label('Password').min(8).required(),
});

interface FormValues {
	email: string,
	password: string,
}

const initialValues: FormValues = {
	email: '',
	password: '',
};

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string|undefined>();
	const [apiErrors, setApiErrors] = useState({});
	const passwordRef = useRef<HTMLInputElement>()
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = (values: FormValues) => {
		setLoading(true);
		setError(undefined);
		setApiErrors({});
		attemptLogin(values.email, values.password).then(res => {
			setUser(res.data.user);
			navigate('/');
		}).catch(err => {
			setLoading(false);
			if (err.response && err.response.status === 422) {
				setApiErrors(err.response.data.errors);
				passwordRef.current?.focus();
				passwordRef.current?.select();
				return;
			}
			console.error(err);
			setError('Something went wrong, please try again');
		})
	}

	return (
		<div className="flex items-center w-screen h-screen justify-items-center bg-gray-100">
			<div className="shadow m-auto max-w-full w-96 p-4 bg-white">
				<div className="w-full text-center p-4">
					<img src={logo} alt="Logo" className="w-32 inline" />
				</div>
				<Formik validationSchema={rules} initialValues={initialValues} onSubmit={onSubmit} className="mb-4">
					{({errors, isValid, touched}) => {
						const allErrors = {...errors, ...apiErrors};
						return (
						<Form className="text-left">
							<div className="mb-4">
								<label htmlFor="email" className="form-label block">Email:</label>
								<Field name="email" className="input-control block w-full" placeholder="you@example.com"/>
								<Error error={allErrors.email} />
							</div>
							<div className="mb-4">
								<label htmlFor="password" className="form-label block">Password:</label>
								<Field name="password" type="password" className="input-control block w-full" placeholder="********" innerRef={passwordRef}/>
								<Error error={allErrors.password} />
							</div>
							<Error error={error} />
							<div>
								<button disabled={!isValid || loading} className="button button-primary block w-full">{loading ? 'Please wait...' : 'Login'}</button>
							</div>
						</Form>
					)}}
				</Formik>
				<div className="mt-4">
					<Link to="/forgotPassword" className="link">Forgot Password</Link>
				</div>
			</div>
		</div>
	);
}

export default Login; 