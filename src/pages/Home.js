// import { useAuthContext } from "../hooks/useAuthContext"

// import { useCollection } from '../hooks/useCollection';
// import { useRef, useState } from 'react';
// import { useStorage } from '../hooks/useStorage';
// import { useAuth } from '../hooks/useAuth'
// import { useModal } from '../hooks/useModal';
// import { useToast } from '../hooks/useToast';
// import { usePrompt } from '../hooks/usePrompt'
// import { useSwipe } from '../hooks/useSwipe';
import HomeWallpaper from "../components/HomeWallpaper";
import HomeShowcase from "../components/HomeShowcase";
import '../css/Home.css'


export default function Home() {
  // const { user } = useAuthContext()
  // const { documents: books, isPending, error } = useCollection('books', [['uid', '==', user.uid]], [['createdAt', 'asc']], 5 )

  // const { showModal, closeModal, modal } = useModal()
  // const { showToast, toast } = useToast()
  // const { promptChoice, promptPassword, prompt } = usePrompt()
  // const { Swiper, swipeDirection } = useSwipe()

  // const { addFile } = useStorage()

  // const fileRef = useRef()
  // const [profilePicture, setProfilePicture] = useState('/favicon.ico')
  // const [thumbnail, setThumbnail] = useState()
  // const [thumbnailError, setThumbnailError] = useState(null)

  // const { _reauthenticateWithCredential, _deleteUser } = useAuth()

  // const handleProfileChange = e => {
  //   console.log('test');
  //   setThumbnailError(null)
  //     const selected = e.target.files[0];
  //     // console.log('file', f);
  //     let reader = new FileReader();
  //     reader.readAsDataURL(selected);
  //     reader.onloadend = function (e) {
  //         setProfilePicture(reader.result);
  //     };

  //     if(!selected){
  //         console.log('select a file');
  //         setThumbnailError("Please select a file.")
  //         return
  //     }
  //     if(!selected.type.includes("image")){
  //       console.log('file must be an img');
  //         setThumbnailError("Selected File must be an image.")
  //         return
  //     }
  //     console.log(selected.size );
  //     if(selected.size > 70000){
  //         console.log('file too big');
  //         setThumbnailError("Your Image is too Powerful!")
  //         return
  //     }

  //     console.log(thumbnailError)

  //     setThumbnail(selected)
  //     console.log(selected)
  // }

  // const handleProfilePictureSaveClick = () => {
  //   // console.log('click test');
  //   console.log(thumbnail)
  //     const oldPhotoURL = user.photoURL
  //     const uploadPath = `profilepics/${user.uid}/${thumbnail.name}`
  //     if(!thumbnailError){
  //       console.log('add file');
  //       console.log('oldPhotoURL: ', oldPhotoURL);
  //       console.log('uploadPath: ', uploadPath);
  //       addFile(uploadPath, thumbnail).then(img => {
  //         console.log('newprint: ', img);
  //       })
  //     }
  // }

  

  return (
    <>
      <HomeWallpaper />
      <HomeShowcase />

    </>


  );
}
