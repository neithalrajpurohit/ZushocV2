import React, { useEffect, useState } from "react";
import Header from "./Header";
import { BsImageFill, BsEmojiHeartEyesFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import {
    postFeed,
    getFeed,
    putLike,
    putUnlike,
    deletePost,
} from "../Features/Post/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../Features/Auth/AuthSlice";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import ZushocImageCrop from "./ImageCrop/ZushocImageCrop";

const Feed = () => {
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const [displayImage, setDisplayImage] = useState({
        preview: "",
        imageFile: null,
    });
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [progess, setProgress] = useState(0);

    const post = useSelector((state) => state.post);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getFeed());
        dispatch(getLoggedInUser());
    }, []);

    const imageHandler = (e) => {
        let userImage = e.target.files[0];
        let previewUrl = URL.createObjectURL(userImage);
        setDisplayImage({ preview: previewUrl, imageFile: userImage });
    };

    const onUpload = (progress) => {
        setProgress(progress);
    };

    const onImageEditSave = (imageFile) => {
        setDisplayImage({ imageFile, preview: imageFile });
    };

    const postHandler = () => {
        dispatch(
            postFeed({
                content: text,
                imageFile: displayImage.imageFile,
                onUpload,
            })
        )
            .unwrap()
            .then(() => {
                setText("");

                setDisplayImage({ preview: "", imageFile: "" });
                setDisplayEmoji("");
                setProgress(0);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <div
                onClick={() => setDisplayEmoji(false)}
                className="card  bg-base-200 shadow-xl max-w-[500px] mx-auto mt-[30px] pt-[20px] "
            >
                <div className="card-body ">
                    <h1>What's cooking?</h1>
                    <textarea
                        className="textarea bg-base-300"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="2"
                    />

                    <div className="relative card-actions justify-between items-center flex">
                        <div className="flex gap-4">
                            <label htmlFor="">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="myImgs"
                                    hidden
                                    onChange={(e) => imageHandler(e)}
                                />
                                <ZushocImageCrop
                                    uploadImage={onImageEditSave}
                                    saveTitle="Save"
                                >
                                    <BsImageFill className="cursor-pointer" />
                                </ZushocImageCrop>
                            </label>
                            <BsEmojiHeartEyesFill
                                className="cursor-pointer"
                                onClick={(e) => {
                                    setDisplayEmoji(!displayEmoji);
                                    e.stopPropagation();
                                }}
                            />
                        </div>
                        {displayImage.preview && (
                            <div className="h-[300px] w-[500px]">
                                <img
                                    src={displayImage.preview}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        )}
                        {displayEmoji && (
                            <div className="absolute top-[40px] z-10">
                                <EmojiPicker
                                    onEmojiClick={(e) =>
                                        setText((prev) => {
                                            return prev + e.emoji;
                                        })
                                    }
                                />
                            </div>
                        )}
                        <button
                            onClick={() => postHandler()}
                            className="btn btn-primary ml-auto"
                        >
                            Post
                        </button>
                    </div>
                    {progess > 0 && (
                        <progress
                            className="progress w-full"
                            value={progess}
                            max="100"
                        ></progress>
                    )}
                </div>
            </div>
            {/* {Loading Skeleton} */}
            {post?.isLoading ? (
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
                <div>
                    {/* <--------post ------------> */}
                    <InfiniteScroll
                        className="flex flex-wrap justify-center mt-[50px]"
                        dataLength={post?.posts?.length} //This is important field to render the next data
                        loader={<h4>Loading...</h4>}
                    >
                        {post?.posts?.map((feed) => {
                            return (
                                <div
                                    key={feed._id}
                                    className="card glass max-w-[500px]"
                                >
                                    <div className="flex p-3 gap-3">
                                        <div className="avatar">
                                            <div className="w-8 mask mask-squircle">
                                                <img
                                                    src={
                                                        feed?.userId?.profileURL
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() =>
                                                navigate(
                                                    `/profile/${feed.userId.username}`
                                                )
                                            }
                                        >
                                            <div className="capitalize text-2xl">
                                                {" "}
                                                {feed?.userId?.name}
                                            </div>
                                            <div className=" -mt-[9px]">
                                                @{feed?.userId?.username}
                                            </div>{" "}
                                        </div>
                                    </div>
                                    <figure className="w-[500px] px-[20px] h-[400px] overflow-hidden">
                                        <img
                                            src={feed.postImage}
                                            className="w-full rounded-lg object-cover h-full  "
                                            alt="car!"
                                        />
                                    </figure>
                                    <div className="card-body w-full ">
                                        {feed?.likedBy.findIndex((post) => {
                                            return post?._id === auth?.user._id;
                                        }) === -1 ? (
                                            <div className="flex items-center gap-2">
                                                <AiOutlineHeart
                                                    onClick={() =>
                                                        dispatch(
                                                            putLike({
                                                                id: feed._id,
                                                            })
                                                        )
                                                    }
                                                    className="text-3xl active:scale-75 cursor-pointer transition-transform duration-150"
                                                />
                                                <p>
                                                    {feed.likedBy.length} likes
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <AiFillHeart
                                                    fill={"red"}
                                                    className="text-3xl active:scale-75 transition-transform duration-150 cursor-pointer"
                                                    onClick={() =>
                                                        dispatch(
                                                            putUnlike({
                                                                id: feed._id,
                                                            })
                                                        )
                                                    }
                                                />
                                                <p className="font-bold">
                                                    {feed.likedBy.length} likes
                                                </p>
                                            </div>
                                        )}
                                        <div className="relative">
                                            <AiFillDelete
                                                className="absolute bottom-2 right-[10px] text-2xl cursor-pointer"
                                                onClick={() =>
                                                    dispatch(
                                                        deletePost({
                                                            id: feed._id,
                                                        })
                                                    )
                                                }
                                            />
                                        </div>
                                        <p>{feed.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            )}
        </div>
    );
};

export default Feed;
