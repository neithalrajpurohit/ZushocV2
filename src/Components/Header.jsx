import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../Features/Auth/AuthSlice";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FcSearch } from "react-icons/fc";

const Header = () => {
    const navigate = useNavigate();
    const [selectedTheme, setSelectedTheme] = useState("");
    const [showTheme, setShowTheme] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const themeSelect = (theme) => {
        setSelectedTheme(theme);
        let tag = document.getElementsByTagName("html")[0];
        tag.setAttribute("data-theme", theme);
        localStorage.setItem("userTheme", theme);
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    const THEMES = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ];
    useEffect(() => {
        let storeTheme = localStorage.getItem("userTheme");
        if (storeTheme) {
            setSelectedTheme(storeTheme);
            let tag = document.getElementsByTagName("html")[0];
            tag.setAttribute("data-theme", storeTheme);
        }
        dispatch(getLoggedInUser());
    }, []);

    return (
        <div className="navbar text-neutral-content bg-neutral">
            <div className="flex-[.7]">
                <a className="btn btn-ghost normal-case text-xl">Zushoc</a>
            </div>
            <div className="dropdown">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/">Feed</Link>
                        </li>
                        <li tabIndex={0}>
                            <Link to={`/profile/${auth?.user?.username}`}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/followsuggestions">
                                FollowSuggestions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-none gap-2 ml-auto">
                <div className="form-control">
                    <div className="relative">
                        <FcSearch
                            className="absolute top-[13px] text-2xl left-[8px] "
                            onClick={() =>
                                navigate("/followsuggestions", {
                                    state: { from: "search", query: search },
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered pl-[35px]"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="dropdown dropdown-end  text-neutral-content">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src={auth?.user?.profileURL} />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3  bg-neutral text-neutral-content p-2 shadow menu menu-compact dropdown-content  rounded-box w-52"
                    >
                        <li>
                            <a onClick={() => setShowTheme(!showTheme)}>
                                Themes
                            </a>

                            {showTheme &&
                                THEMES.map((theme, i) => {
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => themeSelect(theme)}
                                        >
                                            {theme}
                                            {theme === selectedTheme && (
                                                <BsFillCheckCircleFill
                                                    onClick={() =>
                                                        themeSelect(theme)
                                                    }
                                                    className="ml-auto"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </li>
                        {!showTheme && (
                            <li>
                                <a onClick={() => logout()}>Logout</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
