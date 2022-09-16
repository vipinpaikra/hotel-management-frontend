import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload(false);
    };
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "none" }}
                >
                    <span className="logo">RLbooking</span>
                </Link>
                {user ? (
                    <div>
                        <h2 style={{ color: "greenyellow" }}>
                            {user.username}
                        </h2>
                    </div>
                ) : (
                    <div className="navItems">
                        <button
                            className="navButton"
                            onClick={() => {
                                navigate("/registration");
                            }}
                        >
                            Register
                        </button>
                        <button
                            className="navButton"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
            {user ? (
                <button
                    onClick={logout}
                    style={{
                        color: "white",
                        background: "red",
                        borderRadius: "5px",
                        margin: "15px",
                        height: "29px",
                        cursor: "pointer",
                    }}
                >
                    Signout
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Navbar;
