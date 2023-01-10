import { useCollection } from "../hooks/useCollection"
import { useFirestore } from "../hooks/useFirestore";
import { useStorage } from "../hooks/useStorage";

import { MAX_FILE_SIZE, rngFilename } from "../helper/helper";

import '../css/Manage.css'
import { useRef, useState } from "react";

export default function ManageCategory() {

    const { documents } = useCollection('category')
    const { updateDocument } = useFirestore('category')
    const { addFile, deleteFile } = useStorage()

    const [saveImgState, setSaveImgState] = useState(null); 
    const [selected, setSelected] = useState(null);

    console.log(documents);

    const fileRef = useRef()

    const handleSaveClick = (e, id) => {

        const title = e.target.parentElement.children[2].value
        const color = e.target.parentElement.children[3].value
        console.log(title, color, id);
        
        updateDocument(id, {title, color})
        .then( () => {
            console.log('Updated Document')
        })
        .catch( () => {
            console.log('an Error has occured')
        })
    }

    const handleProfileChange = e => {
        // console.log(e.target.parentElement.children[0])
        // console.log('test');
        // setThumbnailError(null)
        const _selected = e.target.files[0];
        // console.log('file', f);
          
    
        if(!_selected){
            console.log('select a file');
            setSaveImgState("select file")
            return
        }
        if(!_selected.type.includes("image")){
            console.log('file must be an img');
            setSaveImgState("select image")
            return
        }
        //   console.log(_selected.size );
        if(_selected.size > MAX_FILE_SIZE){
            console.log('file too big');
            setSaveImgState("too big")
            return
        }

        
        let reader = new FileReader();
        reader.readAsDataURL(_selected);
        reader.onloadend = function () {
            e.target.parentElement.children[0].src = reader.result
        };

        //   console.log(_selected)
        setSaveImgState(true)
        setSelected(_selected)
    }


    
      const handleCategoryImageSaveClick = (oldURL, id) => {
        console.log('click test ', `category/${rngFilename()}`);
        console.log(selected.name.split('.').pop() )
        //   const oldPhotoURL = user.photoURL
        //   const uploadPath = `profilepics/${user.uid}/${thumbnail.name}`
        //   if(!thumbnailError){
        //     console.log('add file');
        //     console.log('oldPhotoURL: ', oldPhotoURL);
        //     console.log('uploadPath: ', uploadPath);
        //     addFile(uploadPath, thumbnail).then(img => {
        //       console.log('newprint: ', img);
        //     })
        //   }
        

        addFile(`category/${rngFilename()}.${selected.name.split('.').pop()}`, selected)
          .then((url) => {
            console.log('Image Uploaded')
            deleteFile(oldURL)
            .then(() => {
                console.log('Previous Image Deleted')
                updateDocument(id, {url})
                .then(() => {
                    console.log('Updated Doc of new URL')
                })
                .catch(() => {
                    console.log('Error updating new URL')
                })
            })
            .catch(() => {
                console.log('Previous Image has not been Deleted')
            })
          })
          .catch(() => {
            console.log('Image has not been uploaded')
          })
      }

     

    // console.log(fsresponse)

    return (
        <div className="manage-category-main container flex-col-center-start p-2  mt-2 ">
            {documents && documents.map(doc => (
                <div key={doc.id} className="widget  mb-1 flex-row-center-center">
                    <img  onClick={(e)=> e.target.parentElement.children[1].click() } className="bg-white" src={doc.url} alt="" title="Category Image" />
                    <input onChange={handleProfileChange} ref={fileRef} type="file" style={{display: 'none'}} />
                    <input className="input title ml-1" type="text" defaultValue={doc.title} placeholder="Title" title="Category Title" />
                    <input className="color ml-1" type="color" defaultValue={doc.color} title="Category Theme Color" />
                    <button onClick={e => handleSaveClick(e, doc.id )} className="btn-green ml-1" title="Save Title and Color">Save</button>
                    {saveImgState === true ? <button onClick={() => handleCategoryImageSaveClick(doc.url, doc.id)} className="btn-green ml-1">Save Image</button> : saveImgState === null ? <button onClick={(e)=> e.target.parentElement.children[1].click() } className="btn-green ml-1">Select Image</button> : <button disabled className="btn-green ml-1">{saveImgState}</button>}
                </div>
            ))}
            <div className="widget mb-1 flex-row-center-center">
                    <img onClick={(e)=> e.target.parentElement.children[1].click() } className="bg-white" src="" alt="" title="Category Image" />
                    <input onChange={handleProfileChange} ref={fileRef} type="file" style={{display: 'none'}} />
                    <input className="input title ml-1" type="text" placeholder="Title" title="Category Title" />
                    <input className="color ml-1" type="color" title="Category Theme Color" />
                    <button className="btn-green twice ml-1" title="Save Title and Color">Add New Category</button>
                </div>
            <span className="minitext">Cannot add new Categories at the moment</span>
        </div>
    )
}
