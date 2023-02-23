import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
    getProfile,
    getUserPosts,
    changeImage,
    updateProfile,
} from "../Features/Post/PostSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, unFollowUser } from "../Features/Auth/AuthSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ZushocCrop from "./ImageCrop/ZushocImageCrop";

const Profile = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const post = useSelector((state) => state?.post);
    const [profileImage, setProfileImage] = useState({
        previewURL: "",
        imagefile: null,
    });
    const [editProfile, setEditProfile] = useState({
        name: "",
        username: "",
        bio: "",
    });
    let params = useParams();

    useEffect(() => {
        dispatch(getProfile({ username: params.username }));
        dispatch(getUserPosts({ username: params.username }));
    }, [params]);

    const uploadImage = (file) => {
        dispatch(changeImage({ imageFile: file }))
            .unwrap()
            .then(() => {
                dispatch(getProfile({ username: params.username }));
            });
    };

    const handleUnfollow = (unFollowerId) => {
        dispatch(
            unFollowUser({
                id: unFollowerId,
            })
        )
            .unwrap()
            .then(() =>
                dispatch(
                    getProfile({
                        username: params.username,
                    })
                )
            )
            .catch((err) => {
                console.log(err);
            });
    };
    const handlefollow = (followerId) => {
        dispatch(
            followUser({
                id: followerId,
            })
        )
            .unwrap()
            .then(() =>
                dispatch(
                    getProfile({
                        username: params.username,
                    })
                )
            )
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <div className="mt-[40px] max-w-[1200px] mx-auto">
                {/* {Loading skeleton} */}
                {post.isProfileLoading ? (
                    <div className="flex gap-[80px] justify-center">
                        <Skeleton
                            circle
                            width={160}
                            height={160}
                            highlightColor="#444"
                            baseColor="#353535"
                        />
                        <div>
                            <Skeleton
                                count={1}
                                width={200}
                                highlightColor="#444"
                                baseColor="#353535"
                            />
                            <div className="mt-4" />
                            <Skeleton
                                width={50}
                                count={2}
                                highlightColor="#444"
                                baseColor="#353535"
                            />
                            <div className="flex items-center gap-10 mt-7">
                                <Skeleton
                                    width={80}
                                    highlightColor="#444"
                                    baseColor="#353535"
                                />
                                <Skeleton
                                    width={80}
                                    highlightColor="#444"
                                    baseColor="#353535"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-7 justify-center">
                        <div className="flex justify-center gap-[70px] items-center">
                            <div className="flex flex-col items-center">
                                <label
                                    htmlFor={
                                        auth.user?._id === post.profile?._id
                                            ? ""
                                            : ""
                                    }
                                    className={
                                        auth.user?._id === post.profile?._id
                                            ? "relative group overflow-hidden cursor-pointer"
                                            : "relative"
                                    }
                                >
                                    {post?.imageUploading ? (
                                        <div>
                                            <Skeleton
                                                width={160}
                                                height={160}
                                                highlightColor="#444"
                                                baseColor="#353535"
                                                circle
                                            />
                                        </div>
                                    ) : (
                                        <ZushocCrop uploadImage={uploadImage}>
                                            <div className="avatar">
                                                <div className="w-[160px] mask mask-squircle relative">
                                                    <div className="absolute top-0 right-0 left-0 bottom-0 group-hover:bg-[rgba(0,0,0,.7)] z-10 transition-all duration-200">
                                                        <p className="btn btn-outline text-[10px] btn-sm absolute top-[40%] left-[22px]  translate-y-28 invisible group-hover:visible group-hover:translate-y-0">
                                                            Change Profile
                                                        </p>
                                                    </div>
                                                    <img
                                                        src={
                                                            profileImage?.previewURL ||
                                                            post?.profile
                                                                ?.profileURL
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </ZushocCrop>
                                    )}
                                </label>
                                {/* <input
                                    type="file"
                                    hidden
                                    id="profileEdit"
                                    accept="image/*"
                                    onChange={handleProfileImage}
                                /> */}
                                <div className="mt-4">
                                    {/* The button to open modal */}
                                    {auth?.user?._id === post?.profile?._id && (
                                        <label
                                            htmlFor="my-modal-3"
                                            className="btn btn-primary"
                                        >
                                            Edit Profile
                                        </label>
                                    )}
                                    {/* Put this part before </body> tag */}
                                    <input
                                        type="checkbox"
                                        id="my-modal-3"
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label
                                                htmlFor="my-modal-3"
                                                className="btn btn-sm btn-circle absolute right-2 top-2"
                                            >
                                                ✕
                                            </label>
                                            <h3 className="text-lg font-bold">
                                                Edit
                                            </h3>
                                            <p className="py-4">
                                                {/* <input
                                                    placeholder="Edit UserName"
                                                    value={editProfile.username}
                                                    className="input input-border w-full mt-2"
                                                    onChange={(e) => {
                                                        setEditProfile({
                                                            ...editProfile,
                                                            username:
                                                                e.target.value,
                                                        });
                                                    }}
                                                /> */}
                                                <input
                                                    placeholder="Edit Name"
                                                    className="input input-border w-full mt-2"
                                                    value={editProfile.name}
                                                    onChange={(e) => {
                                                        setEditProfile({
                                                            ...editProfile,
                                                            name: e.target
                                                                .value,
                                                        });
                                                    }}
                                                />
                                                <input
                                                    placeholder="Edit Bio"
                                                    value={editProfile.bio}
                                                    className="input input-border w-full mt-2"
                                                    onChange={(e) =>
                                                        setEditProfile({
                                                            ...editProfile,
                                                            bio: e.target.value,
                                                        })
                                                    }
                                                />
                                            </p>
                                            <div>
                                                <button
                                                    disabled={
                                                        post.profileUpdating
                                                    }
                                                    className={
                                                        !post.profileUpdating
                                                            ? "btn btn-active btn-secondary block w-[100px] ml-auto"
                                                            : "btn loading block w-[100px] ml-auto "
                                                    }
                                                    onClick={() =>
                                                        dispatch(
                                                            updateProfile(
                                                                editProfile
                                                            )
                                                        )
                                                            .unwrap()
                                                            .then(() => {
                                                                setEditProfile({
                                                                    bio: "",
                                                                    name: "",
                                                                    username:
                                                                        "",
                                                                });
                                                                dispatch(
                                                                    getProfile({
                                                                        username:
                                                                            params.username,
                                                                    })
                                                                );
                                                            })
                                                    }
                                                >
                                                    {" "}
                                                    {post?.profileUpdating
                                                        ? "Loading"
                                                        : "Save"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-7">
                                    <div>
                                        <div className="text-center pb-4">
                                            {post?.profile?.bio}
                                        </div>

                                        <div className="capitalize">
                                            @{post?.profile?.username}
                                        </div>
                                        <div className="pl-3 capitalize">
                                            {post?.profile?.name}
                                        </div>
                                    </div>
                                    <div>
                                        {auth?.user?._id !==
                                            post?.profile?._id && (
                                            <div>
                                                {!post?.profile?.followersList?.findIndex(
                                                    (user) => {
                                                        return (
                                                            user._id ===
                                                            auth?.user?._id
                                                        );
                                                    }
                                                ) ? (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            handleUnfollow(
                                                                post.profile
                                                                    ?._id
                                                            )
                                                        }
                                                    >
                                                        UnFollow
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            handlefollow(
                                                                post.profile
                                                                    ?._id
                                                            )
                                                        }
                                                    >
                                                        Follow
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-8 flex-wrap mt-[20px]">
                                    <div>
                                        <h1>Followers</h1>
                                        <div className="text-center">
                                            {
                                                post?.profile?.followersList
                                                    ?.length
                                            }
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h1>Following</h1>
                                        <div>
                                            {
                                                post?.profile?.followingList
                                                    ?.length
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {post.isLoading ? (
                <div className="flex flex-wrap items-center justify-center mt-[50px]">
                    {Array(8)
                        .fill(0)
                        .map((el, i) => {
                            return (
                                <div key={i} className="relative">
                                    <Skeleton
                                        height={400}
                                        width={400}
                                        highlightColor="#444"
                                        baseColor="#202020"
                                        className="absolute rounded-2xl"
                                        style={{ borderRadius: "10px" }}
                                    />
                                    <div className="absolute top-4 z-10 left-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton
                                                circle
                                                width={60}
                                                height={60}
                                                highlightColor="#444"
                                                baseColor="#353535"
                                            />
                                            <Skeleton
                                                count={2}
                                                height={20}
                                                width={150}
                                                highlightColor="#444"
                                                baseColor="#353535"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <InfiniteScroll
                    className="flex flex-wrap justify-center mt-[70px]"
                    dataLength={post?.posts?.length} //This is important field to render the next data
                    loader={<h4>Loading...</h4>}
                >
                    {post?.posts?.map((pro) => {
                        return (
                            <div
                                key={pro._id}
                                className="w-[450px] card bg-base-300 p-5"
                            >
                                <figure className="w-[420px] h-[400px] rounded-xl overflow-hidden">
                                    <img
                                        src={pro.postImage}
                                        className="w-full block h-full"
                                        alt="Shoes"
                                    />
                                </figure>
                            </div>
                        );
                    })}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Profile;
