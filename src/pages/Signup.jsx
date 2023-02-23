import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SignupUser, clearState, clearError } from "../Features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    console.log(signup);

    useEffect(() => {
        if (signup.data.name) {
            dispatch(clearState());
            navigate("/login");
        }
    }, [signup]);
    let user = localStorage.getItem("user");

    if (user) {
        user = JSON.parse(user);
        return <Navigate to="/" replace={true} />;
    }
    const submitHandler = () => {
        if (
            signupData.name ||
            signupData.username ||
            signupData.email ||
            signupData.password
        ) {
            dispatch(SignupUser(signupData));
        } else {
            alert("all fields are required");
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[80vh]">
                <div className="card  w-96  shadow-xl p-5   mt-[40px]">
                    <h1 className="my-[12px] text-center font-serif text-2xl">
                        Signup
                    </h1>
                    {/* {Error Message } */}
                    {signup.error && (
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
                                <span>{signup?.error}</span>
                            </div>
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Name"
                        value={signupData.name}
                        className="input input-bordered input-info w-full mb-[12px]"
                        onChange={(e) => {
                            setSignupData({
                                ...signupData,
                                name: e.target.value,
                            });
                            if (signup.error) {
                                dispatch(clearError());
                            }
                        }}
                    />
                    <input
                        type="text"
                        placeholder="UserName"
                        value={signupData.username}
                        className="input input-bordered input-info w-full mb-[14px] "
                        onChange={(e) => {
                            setSignupData({
                                ...signupData,
                                username: e.target.value,
                            });
                            if (signup.error) {
                                dispatch(clearError());
                            }
                        }}
                    />{" "}
                    <input
                        type="text"
                        placeholder="email"
                        value={signupData.email}
                        className="input input-bordered input-info w-full mb-[14px] "
                        onChange={(e) => {
                            setSignupData({
                                ...signupData,
                                email: e.target.value,
                            });
                            if (signup.error) {
                                dispatch(clearError());
                            }
                        }}
                    />{" "}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={signupData.password}
                            className="input input-bordered input-info w-full mb-[24px] "
                            onChange={(e) => {
                                setSignupData({
                                    ...signupData,
                                    password: e.target.value,
                                });
                                if (signup.error) {
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
                        disabled={signup.isLoading}
                        className={
                            !signup.isLoading
                                ? "btn btn-active btn-secondary"
                                : "btn loading"
                        }
                        onClick={() => submitHandler()}
                    >
                        {signup.isLoading ? "Loading" : "Sign Up"}
                    </button>
                    <p className="text-center pt-1">
                        Already have an account ?{" "}
                        <Link className="text-info" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
