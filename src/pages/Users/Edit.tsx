import { useState, useEffect, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../utils/toast';
import {
    deleteUser, fetchUser, saveUser, User,
} from '../../services/users';
import AppLayout from '../../layouts/AppLayout';
import Error from '../../components/Error';
import Modal from '../../components/Modal';
import AuthContext from '../../contexts/AuthContext';

const rules = yup.object({
    name: yup.string().label('Name').required().max(100),
    email: yup.string().label('Email').required().email(),
    password: yup.string().label('Password').nullable().min(8).max(32),
});

interface UserForm {
    name: string,
    email: string,
    password: string,
    emailPassword: boolean,
}

const initialUser: UserForm = {
    name: '',
    email: '',
    password: '',
    emailPassword: true,
};

export const Edit = () => {
    const [user, setUser] = useState<UserForm>();
    const [apiErrors, setApiErrors] = useState<any>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { user: authUser } = useContext(AuthContext);
    const id = params.id || null;

    useEffect(() => {
        setApiErrors({});
        setLoading(true);
        if (id) {
            setLoading(true);
            fetchUser(parseInt(id, 10)).then(({ data }) => {
                setUser({ ...data, password: '', emailPassword: false });
                setLoading(false);
            });
            return;
        }
        setUser({ ...initialUser });
        setLoading(false);
    }, [id]);

    const handleSubmit = (values: User) => {
        setSaving(true);
        setApiErrors({});
        saveUser(values).then(({ data }) => {
            setUser({ ...data, password: '', emailPassword: false });
            successToast('User saved successfully');
            if (!id) {
                navigate(`/users/${data.id}`);
            }
        }).catch((err) => {
            if (err.response && err.response.data.errors) {
                setApiErrors(err.response.data.errors);
            } else {
                console.error(err);
            }
            errorToast('Failed to save user, check for errors');
        }).finally(() => {
            setSaving(false);
        });
    };

    const submitDelete = () => {
        setDeleting(true);
        deleteUser(id).then(() => {
            successToast('User deleted successfully');
            navigate('/users');
        }).catch((err) => {
            console.error(err);
            errorToast('Failed to delete user');
        }).finally(() => {
            setDeleting(false);
            setShowDelete(false);
        });
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <AppLayout header={<div>{`${id ? 'Edit' : 'New'} User`}</div>}>
            <Formik initialValues={{ ...user }} onSubmit={handleSubmit} validationSchema={rules}>
                {({
                    errors, touched, isValid, setFieldValue, values, setFieldTouched,
                }) => {
                    const allErrors = { ...errors, ...apiErrors };
                    const generatePassword = () => {
                        setFieldValue('password', Math.random().toString(36).slice(2));
                        setFieldTouched('password', true);
                        setShowPassword(true);
                        setFieldValue('emailPassword', true);
                    };
                    return (
                        <Form autoComplete="off">
                            <div className="grid gap-4 grid-cols-2">
                                <div className="bg-white shadow p-4">
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
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label block">Password:</label>
                                        <Field name="password" type={showPassword ? 'text' : 'password'} id="password" className="input-control w-full" autoComplete="new-password" />
                                        <Error error={allErrors.password} />
                                        <button type="button" className="button button-secondary mt-4" onClick={generatePassword}>Generate New Password</button>
                                        <div className="my-2">
                                            <label htmlFor="showPassword" className={values.password ? '' : 'opacity-50'}>
                                                <input disabled={values.password === ''} type="checkbox" id="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                                                <span className="ml-1">Show Password</span>
                                            </label>
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="emailPassword" className={values.password ? '' : 'opacity-50'}>
                                                <Field disabled={values.password === ''} type="checkbox" id="emailPassword" name="emailPassword" />
                                                <span className="ml-1">Send Password via Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        {id ? (<button type="button" disabled={saving || deleting || authUser?.id === parseInt(id, 10)} className="button button-danger mr-2" onClick={() => setShowDelete(true)}>Delete</button>) : null}
                                        <button type="submit" className="button button-primary" disabled={saving || !touched || !isValid || deleting}>{saving ? 'Saving...' : 'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            {showDelete ? (
                <Modal title="Delete User" onClose={() => setShowDelete(false)}>
                    <p>
                        Are you sure you want to delete user
                        <span className="font-semibold ml-1">{user.name}</span>
                        ?
                    </p>
                    <div className="flex justify-end mt-4">
                        <button type="button" disabled={deleting} className="button button-primary mr-2" onClick={() => submitDelete()}>Yes</button>
                        <button type="button" disabled={deleting} className="button" onClick={() => setShowDelete(false)}>No</button>
                    </div>
                </Modal>
            ) : null}
        </AppLayout>
    );
};

export default Edit;
