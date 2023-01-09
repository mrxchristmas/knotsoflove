// import { useAuthContext } from "../hooks/useAuthContext"

// import { useCollection } from '../hooks/useCollection';
// import { useRef, useState } from 'react';
// import { useStorage } from '../hooks/useStorage';
// import { useAuth } from '../hooks/useAuth'
// import { useModal } from '../hooks/useModal';
// import { useToast } from '../hooks/useToast';
// import { usePrompt } from '../hooks/usePrompt'
// import { useSwipe } from '../hooks/useSwipe';
import { useIsMobile } from "../hooks/useIsMobile";
import HomeWallpaper from "../components/HomeWallpaper";
import HomeShowcase from "../components/HomeShowcase";
import HomePromotions from "../components/HomePromotions";
import '../css/Home.css'

import { scrollToTop } from '../helper/helper'

import pair1trans from '../assets/itemimages/pair1trans.png'
import pair2trans from '../assets/itemimages/pair2trans.png'
import pair3trans from '../assets/itemimages/pair3trans.png'

import paint1trans from '../assets/itemimages/paint1trans.png'
import paint2trans from '../assets/itemimages/paint2trans.png'
import paint3trans from '../assets/itemimages/paint3trans.png'

import item1trans from '../assets/itemimages/item1trans.png'
import item2trans from '../assets/itemimages/item2trans.png'
import item3trans from '../assets/itemimages/item3trans.png'
import HomeColors from "../components/HomeColors";


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
  const { isMobile } = useIsMobile()

  const homeShowcaseObj = {
    title: ["Discover your new favorite", "macramé collections", "in pairs!"],
    subtitle: ["Look through a selection of handmade macramé merchandise", "and discover for yourself how good they look in pairs!"],
    items: [
      {
          img: pair1trans,
          background: paint1trans,
          title: "Cream of Mushroom"
      },{
          img: pair2trans,
          background: paint2trans,
          title: "Cream of Berry"
      },{
          img: pair3trans,
          background: paint3trans,
          title: "Cream of Eggplant"
      }
        
    ],
    isFirst: true,
    button: {
      text: "View All",
      handleClick: () => console.log('test')
    }
  }
  const homeShowcaseObj2 = {
    title: ["Whats New?", "look through our list of", "our latest mechandise!"],
    subtitle: ["Look through a selection of handmade macramé merchandise", "and discover for yourself how good they look in pairs!"],
    items: [
      {
          img: item1trans,
          background: paint1trans,
          title: "Cream of Mushroom"
      },{
          img: item2trans,
          background: paint2trans,
          title: "Cream of Berry"
      },{
          img: item3trans,
          background: paint3trans,
          title: "Cream of Eggplant"
      }
    ],
    isFirst: false,
    style: {backgroundColor: "#ffa4a4"}
  } 

  

  return (
    <>
      <HomeWallpaper />
      <HomeShowcase data={homeShowcaseObj} />
      <HomePromotions />
      <HomeColors />
      <HomeShowcase data={homeShowcaseObj2}/>
      
      

      <footer className="footer bg-pink text-white flex-row-center-between p-0-4">
        {!isMobile && <span>Terms and Conditions</span>}
        <span className="flex-row-center-center"><span className="big">®</span><span className="font-aureta">Knots of Love</span>&nbsp; by &nbsp;<b>Kaye™</b> &nbsp;&nbsp; ©2023</span>
        {!isMobile && <span onClick={() => scrollToTop()}>Back to Top</span>}
      </footer>

    </>


  );
}
