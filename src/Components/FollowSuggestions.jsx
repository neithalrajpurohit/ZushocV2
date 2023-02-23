import React, { useEffect } from "react";
import Header from "./Header";
import { getAllUsers, getUsersBySearch } from "../Features/Auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FollowSuggestions = () => {
    const users = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.from === "search") {
            dispatch(getUsersBySearch({ username: location.state.query }));
        } else {
            dispatch(getAllUsers());
        }
    }, [location.state]);
    console.log(location.state);
    return (
        <div>
            <Header />

            <h1 className="text-2xl text-center mt-10">Follow Friends</h1>

            {users.isLoading ? (
                <div className="flex justify-center mt-[40px] items-center gap-6 flex-wrap">
                    {Array(15)
                        .fill(0)
                        .map((el, i) => {
                            return (
                                <div key={i} className="relative w-[220px]">
                                    <Skeleton
                                        width={220}
                                        height={240}
                                        highlightColor="#444"
                                        baseColor="#202020"
                                    />
                                    <div className="absolute bottom-7 z-10 flex justify-center w-full">
                                        <Skeleton
                                            count={2}
                                            width={200}
                                            highlightColor="#444"
                                            baseColor="#353535"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div className="flex gap-5 justify-center mt-[40px] flex-wrap">
                    {users?.users
                        ?.filter((user) => {
                            return user?._id !== users?.user._id;
                        })
                        .map((user) => {
                            return (
                                <div
                                    key={user._id}
                                    className="card  glass max-w-[500px] p-5">
                                    <div className="w-[200px] h-[200px] rounded-lg overflow-hidden">
                                        <img src={user?.profileURL} />
                                    </div>
                                    <div className="capitalize text-center pt-2 text-2xl">
                                        <h1>@{user?.username}</h1>
                                    </div>
                                    <div className="text-center">
                                        <h1>{user?.name}</h1>
                                    </div>
                                    <div className="text-center p-3">
                                        <button
                                            className=" btn btn-primary "
                                            onClick={() =>
                                                navigate(
                                                    `/profile/${user.username}`
                                                )
                                            }>
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default FollowSuggestions;
