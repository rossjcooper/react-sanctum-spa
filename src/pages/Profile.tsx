import AppLayout from "../layouts/AppLayout";
import ProfileForm from "../components/ProfileForm";

export const Profile = () => {

	return (
		<AppLayout header={<div>Profile</div>}>
			<div className="grid grid-cols-2 gap-4">
				<div className="bg-white shadow rounded-sm p-4">
					<ProfileForm />
				</div>
			</div>
		</AppLayout>
	);
}

export default Profile;