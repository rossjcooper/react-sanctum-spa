import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import Error from './Error';
import AuthContext from '../contexts/AuthContext';
import { AuthUser, fetchProfile, updateProfile } from '../services/auth';

const rules = yup.object({
    name: yup.string().label('Name').required().max(100),
    email: yup.string().label('Email').required().email(),
});

export const ProfileForm = () => {
    const [user, setUser] = useState<AuthUser>();
    const [apiErrors, setApiErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const { setUser: setAuthUser } = useContext(AuthContext);

    useEffect(() => {
        fetchProfile().then((res) => {
            setUser(res.data.user);
        });
    }, []);

    const handleSubmit = (values: AuthUser) => {
        setSaving(true);
        updateProfile(values).then((res) => {
            setAuthUser(res.data.user);
            setUser(res.data.user);
        }).catch((err) => {
            if (err.response && err.response.data.errors) {
                setApiErrors(err.response.data.errors);
            } else {
                console.error(err);
            }
        }).finally(() => {
            setSaving(false);
        });
    };

    if (!user) {
        return null;
    }

    return (
        <Formik initialValues={{ ...user }} onSubmit={handleSubmit} validationSchema={rules}>
            {({ errors, touched, isValid }) => {
                const allErrors = { ...errors, ...apiErrors };
                return (
                    <Form>
                        <div>
                            <h2 className="text-xl mb-6 text-slate-500">Profile Settings</h2>
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
                                <button type="submit" className="ml-auto button button-primary" disabled={saving || !touched || !isValid}>{saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProfileForm;
