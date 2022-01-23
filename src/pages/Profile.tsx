import AppLayout from '../layouts/AppLayout';
import ProfileForm from '../components/ProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';

export const Profile = () => (
    <AppLayout header={<div>Profile</div>}>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white shadow rounded-sm p-4">
                <ProfileForm />
            </div>
            <div className="bg-white shadow rounded-sm p-4">
                <ChangePasswordForm />
            </div>
        </div>
    </AppLayout>
);

export default Profile;
