import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            Hello {user?.name}
        </div>
    );
}

export default Home;