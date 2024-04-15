import { Modal, useMantineTheme } from "@mantine/core";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {useParams} from 'react-router-dom'
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";
function ProfileModel({ modelOpened, setModelOpened,data }) {
  const theme = useMantineTheme();
  const {password,...other} = data
  const [formData, setFormData] = useState({
    _id: other._id || '', // Thêm _id vào formData
    firstname: other.firstname || '',
    lastname: other.lastname || '',
    worksAt: other.worksAt || '',
    livesin: other.livesin || '',
    country: other.country || '',
    relationship: other.relationship || '',
    profilePicture: '',
    coverPicture: '',
    followers: other.followers || [],
    following: other.following || []
  });
    // Sử dụng useEffect để cập nhật formData mỗi khi data thay đổi
    // useEffect(() => {
    //    setFormData(formData)
      
    // }, [formData]);

  const [profileImg, setProfileImg] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const {user} = useSelector((state)=> state.authReducer.authData)
  
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onImageChange = (event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImg" 
       ? setProfileImg(img)
       : setCoverImg(img)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    let UserData = formData
    if(profileImg){
      const data = new FormData()
      const fileName = Date.now() + profileImg.name;
      data.append("name",fileName)
      data.append("file",profileImg)
      UserData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {console.log(error);}
    }
    if(coverImg){
      const data = new FormData()
      const fileName = Date.now() + coverImg.name;
      data.append("name",fileName)
      data.append("file",coverImg)
      UserData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {console.log(error);}
    }
    dispatch(updateUser(param.id,UserData))
    setModelOpened(false)
  }
  return (
    <Modal 
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
    >
      <form className="infoForm ">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            value={formData.worksAt}
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input type="text" className="infoInput" 
          name="relationship"
            placeholder="Relationship Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImg" onChange={onImageChange}/>
          Cover Image
          <input type="file" name="coverImg" onChange={onImageChange}/>
        </div>
        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModel;
