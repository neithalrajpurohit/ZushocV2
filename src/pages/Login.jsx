import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoginUser, clearState, clearError } from "../Features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (login.data.isAccountCreated) {
            navigate("/", { replace: true });
            dispatch(clearState());
        }
    }, [login]);

    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
        return <Navigate to="/" replace={true} />;
    }
    const submitHandler = () => {
        if (loginData.email || loginData.password) {
            dispatch(LoginUser(loginData))
                .unwrap()
                .then(() => {
                    navigate("/", { replace: true });
                });
        } else {
            alert("all fields are required");
        }
        // console.log(loginData);
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[80vh]">
                <div className="card  w-96  shadow-xl p-5   mt-[40px]">
                    <h1 className="my-[12px] text-center font-serif text-2xl">
                        Login
                    </h1>
                    {/* {Error Message } */}
                    {login.error && (
                        <div className="alert alert-error shadow-lg mb-5">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{login?.error}</span>
                            </div>
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="email or username"
                        className="input input-bordered input-info w-full mb-[14px] "
                        onChange={(e) => {
                            setLoginData({
                                ...loginData,
                                email: e.target.value,
                            });
                            if (login.error) {
                                dispatch(clearError());
                            }
                        }}
                    />{" "}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            className="input input-bordered input-info w-full mb-[24px] "
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                });
                                if (login.error) {
                                    dispatch(clearError());
                                }
                            }}
                        />{" "}
                        {showPassword ? (
                            <AiFillEye
                                className="absolute top-4 right-2"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <AiFillEyeInvisible
                                className="absolute top-4 right-2"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button
                        disabled={login.isLoading}
                        className={
                            !login.isLoading
                                ? "btn btn-active btn-secondary"
                                : "btn loading"
                        }
                        onClick={() => submitHandler()}
                    >
                        {login.isLoading ? "Loading" : "Log In"}
                    </button>
                    <p className="text-center pt-1">
                        Don't have an account ?{" "}
                        <Link className="text-info" to="/signup">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
