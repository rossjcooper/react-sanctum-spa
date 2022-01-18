import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import AppLayout from "../layouts/AppLayout";

export const Home = () => {
    const { user } = useContext(AuthContext);
    return (
       <AppLayout>
		   <div>Dashboard</div>
	   </AppLayout>
    );
}

export default Home;