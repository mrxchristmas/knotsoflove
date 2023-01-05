// import { useAuthContext } from "../hooks/useAuthContext"

// import { useCollection } from '../hooks/useCollection';
// import { useRef, useState } from 'react';
// import { useStorage } from '../hooks/useStorage';
// import { useAuth } from '../hooks/useAuth'
// import { useModal } from '../hooks/useModal';
// import { useToast } from '../hooks/useToast';
// import { usePrompt } from '../hooks/usePrompt'
// import { useSwipe } from '../hooks/useSwipe';
import '../css/Home.css'
import logo from '../assets/logo.svg'
import item1trans from '../assets/itemimages/item1trans.png'
import item2trans from '../assets/itemimages/item2trans.png'
import item3trans from '../assets/itemimages/item3trans.png'
import item4trans from '../assets/itemimages/item4trans.png'
import item5trans from '../assets/itemimages/item5trans.png'
import item6trans from '../assets/itemimages/item6trans.png'
import item7trans from '../assets/itemimages/item7trans.png'
import item8trans from '../assets/itemimages/item8trans.png'
import { useState } from 'react'

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

 

  const catObj = [
    {
      title: "walldecors",
      src: item1trans,
      deg: "deg-0"
    },{
      title: "wood walldecors",
      src: item2trans,
      deg: "deg-45"
    },{
      title: "bookmarkers",
      src: item3trans,
      deg: "deg-90"
    },{
      title: "sandals",
      src: item4trans,
      deg: "deg-135"
    },{
      title: "earrings",
      src: item5trans,
      deg: "deg-180"
    },{
      title: "handbags",
      src: item6trans,
      deg: "deg-225"
    },{
      title: "plant hanger",
      src: item7trans,
      deg: "deg-270"
    },{
      title: "coasters",
      src: item8trans,
      deg: "deg-315"
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState(catObj[0])


  return (
    <div className='home-wallpaper flex-row-center-between'>

      <div className="wallpaper-left flex-col-start-center">
        <div className="logo-container ml-1">
          <img id="logo" src={logo} alt="" />
          <h1 className='logo-text font-aureta'>Knots of Love </h1>
          <span className="logo-alt-text font-normal"><span className='logo-alt-text-cat'>{selectedCategory.title}</span> by <b>Kaye</b></span>
        </div>
        <h1 className='wallpaper-left-text mt-3'>Grab your <span className='emphasize p-0-1 '>favorite</span> <p>merchandise now!</p> </h1>
        
      </div>
      

      <div className="homecat-container mr-3 flex-row-center-center">
        
        <div className="center8 flex-row-center-center">
          <div className="center7 flex-row-center-center">
            <div className="center6 flex-row-center-center">
              <div className="center5 flex-row-center-center">
                <div className="center4 flex-row-center-center">
                  <div className="center3 flex-row-center-center">
                    <div className="center2 flex-row-center-center">
                      <div className="center1 flex-row-center-center">
                        <img className='centerImg' src={selectedCategory.src} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {catObj.map(cat => (
          <div key={cat.title} className={`circle ${cat.deg}`} onClick={() => setSelectedCategory(cat)}  >
            <img className='catImg' src={cat.src} alt="" />
          </div> 
        ))}
      </div>

    </div>
  );
}
