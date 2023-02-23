import { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./CanvasPreview";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbAspectRatioOff, TbAspectRatio } from "react-icons/tb";
import Slider, { Range } from "rc-slider";
import SlickSlider from "react-slick";
import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/instagram.min.css";

const CropImage = ({
    crop,
    setCrop,
    imgRef,
    imgSrc,
    onImageLoad,
    previewCanvasRef,
    completedCrop,
    aspect,
    setCompletedCrop,
    uploadImage,
    handleToggleAspectClick,
    setImgSrc,
    zoom,
    setZoom,
    rotate,
    setRotate,
    setImageFilter,
    imageFilter,
    saveTitle,
}) => {
    const [activeFilterTab, setActiveFilterTab] = useState(0);
    useEffect(() => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                zoom / 100,
                rotate
            );
        }
    }, [completedCrop, zoom, rotate, imageFilter]);

    if (!imgSrc) {
        return null;
    }

    const filters = [
        {
            name: "1977",
            class: "filter-1977",
        },
        {
            name: "aden",
            class: "filter-aden",
        },
        {
            name: "amaro",
            class: "filter-amaro",
        },
        {
            name: "ashby",
            class: "filter-ashby",
        },
        {
            name: "brannan",
            class: "filter-brannan",
        },
        {
            name: "brooklyn",
            class: "filter-brooklyn",
        },
        {
            name: "charmes",
            class: "filter-charmes",
        },
        {
            name: "clarendon",
            class: "filter-clarendon",
        },
        {
            name: "crema",
            class: "filter-crema",
        },
        {
            name: "dogpatch",
            class: "filter-dogpatch",
        },
        {
            name: "earlybird",
            class: "filter-earlybird",
        },
        {
            name: "gingham",
            class: "filter-gingham",
        },
        {
            name: "ginza",
            class: "filter-ginza",
        },
        {
            name: "hefe",
            class: "filter-hefe",
        },
        {
            name: "helena",
            class: "filter-helena",
        },
        {
            name: "hudson",
            class: "filter-hudson",
        },
        {
            name: "inkwell",
            class: "filter-inkwell",
        },
        {
            name: "juno",
            class: "filter-juno",
        },
        {
            name: "kelvin",
            class: "filter-kelvin",
        },
        {
            name: "lark",
            class: "filter-lark",
        },
        {
            name: "lofi",
            class: "filter-lofi",
        },
        {
            name: "ludwig",
            class: "filter-ludwig",
        },
        {
            name: "maven",
            class: "filter-maven",
        },
        {
            name: "mayfair",
            class: "filter-mayfair",
        },
        {
            name: "moon",
            class: "filter-moon",
        },
        {
            name: "nashville",
            class: "filter-nashville",
        },
        {
            name: "perpetua",
            class: "filter-perpetua",
        },
        {
            name: "nashville",
            class: "filter-nashville",
        },
        {
            name: "poprocket",
            class: "filter-poprocket",
        },
        {
            name: "reyes",
            class: "filter-reyes",
        },
        {
            name: "rise",
            class: "filter-rise",
        },
        {
            name: "sierra",
            class: "filter-sierra",
        },
        {
            name: "skyline",
            class: "filter-skyline",
        },
        {
            name: "slumber",
            class: "filter-slumber",
        },
        {
            name: "stinson",
            class: "filter-stinson",
        },
        {
            name: "sutro",
            class: "filter-sutro",
        },
        {
            name: "toaster",
            class: "filter-toaster",
        },
        {
            name: "valencia",
            class: "filter-valencia",
        },
        {
            name: "vesper",
            class: "filter-vesper",
        },
        {
            name: "walden",
            class: "filter-walden",
        },
        {
            name: "willow",
            class: "filter-willow",
        },
        {
            name: "xpro-ii",
            class: "filter-xpro-ii",
        },
    ];

    return (
        <div className="fixed w-[100vw] bg-[rgba(0,0,0,.8)] z-40 h-[100vh] overflow-y-auto top-0 left-0 right-0 bottom-0">
            <div className="max-w-[1200px] relative mx-auto flex justify-center ">
                <div className="absolute right-4 top-2">
                    <button
                        onClick={() => {
                            setImgSrc("");
                            document.querySelector("#profile").value = "";
                        }}>
                        <AiFillCloseCircle className="text-2xl" />
                    </button>
                </div>
                <div className="w-[1200px] h-[700px] flex items-center bg-base-300">
                    {imgSrc && (
                        <div className="p-10">
                            <p className="text-xl">Crop Image</p>
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) =>
                                    setCrop(percentCrop)
                                }
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}>
                                <div
                                    id="image-filter"
                                    className={`w-[500px] h-[500px] filter-${imageFilter}`}>
                                    <img
                                        ref={imgRef}
                                        src={imgSrc}
                                        onLoad={onImageLoad}
                                        style={{
                                            transform: `scale(${
                                                zoom / 100
                                            }) rotate(${rotate}deg)`,
                                        }}
                                        className="w-full h-full object-center object-fill"
                                    />
                                </div>
                            </ReactCrop>
                            <>
                                <div>
                                    <button onClick={handleToggleAspectClick}>
                                        {aspect ? (
                                            <TbAspectRatio className="text-3xl" />
                                        ) : (
                                            <TbAspectRatioOff className="text-3xl" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Zoom</p>
                                    <div className="w-[350px]">
                                        <Slider
                                            onChange={(range) => {
                                                setZoom(range);
                                            }}
                                            startPoint={100}
                                            defaultValue={100}
                                            min={100}
                                            max={200}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <p>Rotate</p>
                                    <div className="w-[350px]">
                                        <Slider
                                            onChange={(range) => {
                                                setRotate(range);
                                            }}
                                            startPoint={0}
                                            defaultValue={0}
                                            min={-180}
                                            max={180}
                                        />
                                    </div>
                                </div>
                            </>
                        </div>
                    )}

                    <div>
                        {completedCrop && (
                            <div className="">
                                <p>Preview</p>
                                <canvas
                                    className={`mt-[10px]`}
                                    ref={previewCanvasRef}
                                    id="canvas"
                                    style={{
                                        border: "1px solid black",
                                        objectFit: "contain",

                                        width: completedCrop.width,
                                        height: completedCrop.height,
                                    }}
                                />
                                <div>
                                    <button
                                        onClick={() => {
                                            let base64ImgFile = document
                                                .querySelector("canvas")
                                                .toDataURL("image/jpeg");
                                            uploadImage(base64ImgFile);
                                            setImgSrc("");
                                        }}
                                        className="btn btn-primary">
                                        {saveTitle}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-base-300 max-w-[1200px] mx-auto pb-5">
                <div className="flex justify-center mb-5">
                    <div className="tabs">
                        <a
                            onClick={() => setActiveFilterTab(0)}
                            className={
                                activeFilterTab === 0
                                    ? `tab tab-lifted tab-active font-semibold`
                                    : `tab tab-lifted font-semibold`
                            }>
                            Zushoc Filters
                        </a>
                        <a
                            onClick={() => setActiveFilterTab(1)}
                            className={
                                activeFilterTab === 1
                                    ? `tab tab-lifted tab-active font-semibold`
                                    : `tab tab-lifted font-semibold`
                            }>
                            Custom Filters
                        </a>
                    </div>
                </div>
                {activeFilterTab === 0 ? (
                    <div className="w-[1100px] mx-auto">
                        <SlickSlider
                            dots={false}
                            infinite={false}
                            speed={500}
                            slidesToShow={6}
                            slidesToScroll={6}>
                            {filters.map((filter, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            setImageFilter(filter.name)
                                        }>
                                        <div
                                            className={
                                                filter.name === imageFilter
                                                    ? `${filter.class} w-[140px] h-[150px] bg-secondary p-2`
                                                    : `${filter.class} w-[140px] h-[150px]`
                                            }>
                                            <img
                                                className="w-full h-full object-fill"
                                                src={imgSrc}
                                            />
                                        </div>
                                        <div className="w-[140px]">
                                            <p className="capitalize text-center">
                                                {filter.name}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </SlickSlider>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 w-[800px] mx-auto">
                        <div className="w-[340px]">
                            <p>Brightness</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>Contrast</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>Grayscale</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>Saturate</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>sepia</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>Invert</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                        <div className="w-[340px]">
                            <p>Opacity</p>
                            <Slider min={0} max={100} defaultValue={0} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropImage;
