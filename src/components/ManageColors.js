import { useCollection } from "../hooks/useCollection"
import { useFirestore } from "../hooks/useFirestore";
import { useStorage } from "../hooks/useStorage";
import { useState } from "react";
import '../css/Manage.css'
import { usePrompt } from "../hooks/usePrompt";

import { MAX_FILE_SIZE, rngFilename } from "../helper/helper";

export default function ManageColors() {


    const { documents } = useCollection('colors')
    const { addDocument, updateDocument, deleteDocument } = useFirestore('colors')
    const { addFile, deleteFile } = useStorage()
    const { prompt, promptChoice } = usePrompt()

    const [saveImgState, setSaveImgState] = useState(null); 
    const [selected, setSelected] = useState(null);

    const handleProfileChange = e => {
        const _selected = e.target.files[0];
    
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
            e.target.parentElement.parentElement.children[0].src = reader.result
        };

        //   console.log(_selected)
        setSaveImgState(true)
        setSelected(_selected)
        e.target.parentElement.children[0].value = _selected.name.split('.')[0].replaceAll('_', ' ')
    }



    
    const handleColorSaveClick = (e) => {
        // console.log('click test ', `category/${rngFilename()}`);
        // console.log(selected.name.split('.').pop() )
        const name = e.target.parentElement.children[0].value

        addFile(`colors/${rngFilename()}.${selected.name.split('.').pop()}`, selected)
            .then((url) => {
                console.log('Image Uploaded')
                addDocument({
                    url,
                    name,
                    isAvailable: true,
                    isLowOnStock: false
                })
                .then(() => {
                    console.log('Data Uploaded')
                    setSelected(null)
                    setSaveImgState(null)
                    e.target.parentElement.children[0].value = ""
                })
                .catch(() => {
                    console.log('Error Uploading Data')
                })
            })
            .catch(() => {
            console.log('Image has not been uploaded')
        })
    }

    const handleCheckboxClick = (e, id, type) => {
        const checked = e.target.checked
        e.checked = checked
        updateDocument(id, type === "isAvailable" ? {
            isAvailable: checked
        } : {
            isLowOnStock: checked
        })
    }
    

    const handleDeleteClick = (id, name, url) => {
        console.log(id, url);
        promptChoice(`Delete ${name} Color? `)
        .then(() => {
            deleteDocument(id)
            .then(() => {
                console.log('Document Deleted');
                deleteFile(url)
                .then(() => {
                    console.log('File Deleted');
                })
                .catch(() => {
                    console.log('File Delete Failed');
                })
            })
            .catch(() => {
                console.log('Document Delete Failed');
            })
        })
        .catch(() => {
            console.log('User Cancelled Delete');
        })
        
    }


    return (
        <>
        {prompt}
        <div className="manage-color-main mt-2 flex-row-center-center p-2 w-100">
            <div className="colors-page w-100  mt-2 flex-col-center-center">
                <div className="row gap-1 w-100">

                    {documents && documents.map(doc => (
                        <div key={doc.id} className="manage-colors-page-widget pl-1 pt-1 col-4-sm col-3-md col-2-lg flex-row-center-between">
                            <img onClick={() => handleDeleteClick(doc.id, doc.name, doc.url)} className="delete" src="/icons/trash-solid.svg" alt="" /> 
                            <div className="imgcover">
                                <img src={doc.url} alt="" />
                            </div>
                            <div className={`title flex-col-start-start `}>
                                <span>{doc.name.replaceAll('_', ' ')}</span>
                                <label className="flex-row-center-center"><input onChange={e => handleCheckboxClick(e, doc.id, "isAvailable")} type="checkbox" checked={doc.isAvailable}  />  available</label>
                                <label className="flex-row-center-center"><input onChange={e => handleCheckboxClick(e, doc.id, "isLowOnStock")} type="checkbox" checked={doc.isLowOnStock}  />low stock</label>
                            </div>
                        </div>
                    )) }

                </div>
                <div className="addColor p-1-2 col-4-sm col-3-md col-2-lg flex-row-center-center">
                    <img src="/icons/settings_black_48dp.svg" alt="" />
                    <div className="ml-2">
                        <input type="text" className="input mb-1" placeholder="Color Name" title="Color Name" />
                        <input onChange={handleProfileChange} type="file" style={{display: 'none'}} />
                        {saveImgState === true ? 
                            <button onClick={(e) => handleColorSaveClick(e)} className="btn-green">Save Image</button> 
                            : saveImgState === null ? 
                            <button onClick={(e)=> e.target.parentElement.children[1].click() } className="btn-green">Select Image</button> 
                            : <button onClick={(e)=> e.target.parentElement.children[1].click() } className="btn-green">{saveImgState}</button>
                        }
                    </div>
                </div>
            </div>        
        </div>
        </>
    )
}
