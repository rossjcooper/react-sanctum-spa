import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import Error from "../components/Error";
import AuthContext from "../contexts/AuthContext";
import AppLayout from "../layouts/AppLayout";
import { AuthUser, fetchProfile, updateProfile } from "../services/auth";
import * as yup from "yup";

const rules = yup.object({
	name: yup.string().label('Name').required().max(100),
	email: yup.string().label('Email').required().email(),
});

export const Profile = () => {
	const [user, setUser] = useState<AuthUser>();
	const [apiErrors, setApiErrors] = useState({});
	const [saving, setSaving] = useState(false);
	const { setUser: setAuthUser } = useContext(AuthContext);

	useEffect(() => {
		fetchProfile().then(res => {
			setUser(res.data.user);
		})
	}, []);

	const handleSubmit = (values: AuthUser) => {
		setSaving(true);
		updateProfile(values).then(res => {
			setAuthUser(res.data.user);
			setUser(res.data.user);
		}).catch(err => {
			if (err.response && err.response.data.errors) {
				setApiErrors(err.response.data.errors);
			} else {
				console.error(err);
			}
		}).finally(() => {
			setSaving(false);
		})
	}


	return (
		<AppLayout header={<div>Profile</div>}>
			{user ? (
				<div className="grid grid-cols-2 gap-4">
					<Formik initialValues={{ ...user }} onSubmit={handleSubmit} validationSchema={rules}>
						{({ errors, touched, isValid }) => {
							const allErrors = { ...errors, ...apiErrors };
							return (
								<Form>
									<div className="bg-white shadow rounded-sm p-4">
										<h2 className="text-xl mb-6 text-gray-400">Profile Settings</h2>
										<div className="mb-4">
											<label htmlFor="name" className="form-label block">Name:</label>
											<Field name="name" id="name" className="input-control w-full" />
											<Error error={allErrors.name} />
										</div>
										<div className="mb-4">
											<label htmlFor="email" className="form-label block">Email:</label>
											<Field name="email" type="email" id="email" className="input-control w-full" />
											<Error error={allErrors.email} />
										</div>
										<div className="flex">
											<button className="ml-auto button button-primary" disabled={saving || !touched || !isValid}>{saving ? 'Saving...' : 'Save'}</button>
										</div>
									</div>
								</Form>
							)
						}}
					</Formik>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</AppLayout>
	);
}

export default Profile;