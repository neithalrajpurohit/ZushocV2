import { useState, useRef } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropImage from "./CropImage";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const ZushocImageCrop = ({ children, uploadImage, saveTitle = "Upload" }) => {
    const [crop, setCrop] = useState();
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const [completedCrop, setCompletedCrop] = useState();
    const [aspect, setAspect] = useState(1);
    const [zoom, setZoom] = useState(100);
    const [rotate, setRotate] = useState(0);
    const [imageFilter, setImageFilter] = useState("");

    const onSelectFile = (e) => {
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgSrc(reader.result?.toString() || "");
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined);
        } else if (imgRef.current) {
            const { width, height } = imgRef.current;
            setAspect(1);
            setCrop(centerAspectCrop(width, height, 1));
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    return (
        <div>
            <label htmlFor="profile">{children}</label>
            <input
                id="profile"
                accept="image/*"
                type="file"
                hidden
                onChange={onSelectFile}
            />
            <label htmlFor="none">
                <CropImage
                    saveTitle={saveTitle}
                    setImageFilter={setImageFilter}
                    imageFilter={imageFilter}
                    zoom={zoom}
                    setZoom={setZoom}
                    rotate={rotate}
                    setRotate={setRotate}
                    aspect={aspect}
                    completedCrop={completedCrop}
                    crop={crop}
                    handleToggleAspectClick={handleToggleAspectClick}
                    imgRef={imgRef}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    onImageLoad={onImageLoad}
                    previewCanvasRef={previewCanvasRef}
                    setCrop={setCrop}
                    setCompletedCrop={setCompletedCrop}
                    uploadImage={uploadImage}
                />
            </label>
        </div>
    );
};

export default ZushocImageCrop;
