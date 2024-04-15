import React, { useRef, useState } from "react";
import Profileimage from "../../img/profileImg.jpg";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilScenery } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import "./PostShare.css";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import {useDispatch,useSelector} from "react-redux"
import { uploadImage, uploadPost } from "../../actions/UploadAction";
const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const {user} = useSelector((state)=>state.authReducer.authData)
  const desc = useRef()
  const serverpublic = process.env.REACT_APP_PUBLIC_FOLDER
  const loading = useSelector((state)=>state.postReducer.uploading)
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const reset = () =>{
    setImage(null);
    desc.current.value=""
  }
  const handlePost = (e)=>{
    e.preventDefault();
    const newPost = {
       userId : user._id,
       desc: desc.current.value
    }
    if(image){
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append("name",filename)
      data.append("file",image)
      newPost.image = filename
      console.log(newPost);
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }
  return (
    <div className="PostShare">
      <img src={user.profilePicture ? serverpublic + user.profilePicture : serverpublic + "profile.png"} alt="" />
      <div>
        <input 
        ref = {desc}
        required
        type="text" placeholder="what's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button"
           onClick={handlePost}
           disabled={loading}
          >{loading ? "Loading...": "Share"}</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && 
           <div className="previewImage">
              <UilTimes onClick={()=> setImage(null)}/>
              <img src={URL.createObjectURL(image)} alt="" />
           </div>
        }
      </div>
    </div>
  );
};

export default PostShare;
