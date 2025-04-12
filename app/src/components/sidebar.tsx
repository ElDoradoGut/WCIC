import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon.png";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div style={{
            width: "80px",
            background: "#f3e8ff",
            padding: "1rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "1px solid #ccc"
        }}>
            <img src={Icon} width="80px" height="80px"/>
            <Link to="/recipes" style={{ marginBottom: "1rem", marginTop:"1rem", color: location.pathname === "/recipes" ? "purple" : "black" }}>🍽️</Link>
            <Link to="/ingredients" style={{ color: location.pathname === "/ingredients" ? "purple" : "black" }}>🥦</Link>
        </div>
    );
};

export default Sidebar;