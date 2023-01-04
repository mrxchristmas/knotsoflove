import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import { useAuthContext } from "../hooks/useAuthContext"

import { useCollection } from '../hooks/useCollection';
import { useRef, useState } from 'react';
import { useStorage } from '../hooks/useStorage';
// import { useAuth } from '../hooks/useAuth'
// import { useModal } from '../hooks/useModal';
// import { useToast } from '../hooks/useToast';
// import { usePrompt } from '../hooks/usePrompt'
// import { useSwipe } from '../hooks/useSwipe';


export default function Home() {
  const { user } = useAuthContext()
  const { documents: books, isPending, error } = useCollection('books', [['uid', '==', user.uid]], [['createdAt', 'asc']], 5 )

  // const { showModal, closeModal, modal } = useModal()
  // const { showToast, toast } = useToast()
  // const { promptChoice, promptPassword, prompt } = usePrompt()
  // const { Swiper, swipeDirection } = useSwipe()

  const { addFile } = useStorage()

  const fileRef = useRef()
  // const profilePicture = "https://via.placeholder.com/150"
  const [profilePicture, setProfilePicture] = useState('/favicon.ico')
  const [thumbnail, setThumbnail] = useState()
  const [thumbnailError, setThumbnailError] = useState(null)

  // const { _reauthenticateWithCredential, _deleteUser } = useAuth()

  const handleProfileChange = e => {
    console.log('test');
    setThumbnailError(null)
      const selected = e.target.files[0];
      // console.log('file', f);
      let reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onloadend = function (e) {
          setProfilePicture(reader.result);
      };

      if(!selected){
          console.log('select a file');
          setThumbnailError("Please select a file.")
          return
      }
      if(!selected.type.includes("image")){
        console.log('file must be an img');
          setThumbnailError("Selected File must be an image.")
          return
      }
      console.log(selected.size );
      if(selected.size > 70000){
          console.log('file too big');
          setThumbnailError("Your Image is too Powerful!")
          return
      }

      console.log(thumbnailError)

      setThumbnail(selected)
      console.log(selected)
  }

  const handleProfilePictureSaveClick = () => {
    // console.log('click test');
    console.log(thumbnail)
      const oldPhotoURL = user.photoURL
      const uploadPath = `profilepics/${user.uid}/${thumbnail.name}`
      if(!thumbnailError){
        console.log('add file');
        console.log('oldPhotoURL: ', oldPhotoURL);
        console.log('uploadPath: ', uploadPath);
        addFile(uploadPath, thumbnail).then(img => {
          console.log('newprint: ', img);
        })
      }
  }

  const handleTestClick = () => {
    // const displayName = "Hamsteruu"
    // const photoURL = "https://firebasestorage.googleapis.com/v0/b/blankproj2023.appspot.com/o/profilepics%2FLcr6ocRoanRBEvhB1pYbzgljzHF2%2Foinky_me.png?alt=media&token=932a5b8e-68f9-42ad-85ec-e1434adbb442"
    // _updateProfile(displayName, photoURL)

    
    // {email: "kerou@stlln.com", password: "test123"}
    // const reauthCb = res => {
    //   // _updateEmail("s42.xmas@gmail.com")
    //   // _updatePassword("test123")
    //   _deleteUser()
    // }
    // _reauthenticateWithCredential('test123', reauthCb)
    // _sendPasswordResetEmail(user.email)

    // loginWithGoogle()

    // showModal((
    //   <div onClick={() => closeModal()}>
    //     ON SALE!
    //   </div>
    // ))
    // showToast({message: "HAYUUUP"})

    // promptChoice("Would you like to eat now?").then(() => {
    //   console.log('its a yes from me!');
    // })
    // .catch(() => {
    //   console.log('its a no from me!');
    // })

    // promptPassword({title: "Plese Enter Password", placeholder: "Enter your Password"})
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(() => {
    //   console.log('user cancelled');
    // })

    
  }

  return (
    <div className='container'>
      {isPending && <div>Loading...</div>}
      {error && <div>ERROR: {error}</div>}
      {books && <BookList books={books} />}
      <BookForm />
      <br />
      <br />
      <br />
      <button onClick={() => handleTestClick()}>Test Me</button>
      <br />
      <br />
      <br />

      <div className="content flex-col-center-start">
          <div className="formwidget">
              <h3>Profile Picture</h3>
              <div onClick={()=> fileRef.current.click()} className="imgcon">
                  <img className='imgtest' src={profilePicture} alt="" />
              </div>
              <input onChange={handleProfileChange} ref={fileRef} type="file" style={{display: 'none'}} />
          </div>
          <button onClick={handleProfilePictureSaveClick} className="submit-btn">Save</button>
      </div>

      {/* {modal && modal} */}
      {/* {toast && toast} */}
      {/* {prompt && prompt} */}
    </div>
  );
}
