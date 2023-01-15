// import { useParams } from "react-router-dom"
import { useFirestore } from '../hooks/useFirestore'
import { useAuthContext } from '../hooks/useAuthContext'
import { useDocument } from '../hooks/useDocument'
// import { useCollection } from "../hooks/useCollection"
// import { useIsMobile } from '../hooks/useIsMobile'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'




export default function GalleryPage({ data: items }) {

    
    // const { isMobile } = useIsMobile()
    const { user } = useAuthContext()
    // const { categoryid } = useParams()
    const { document: userObj } = useDocument('users', user.uid)
    // const { documents: items } = useCollection('items', [ [ "category", "==", selCat ] ] )

    
    const { setDocument } = useFirestore('users')
    const [favItems, setFavItems] = useState(null)

    // console.log(items);
    

   
    useEffect(() => {
        if(userObj){
            if(userObj.favItems){
                setFavItems(userObj.favItems)
                // console.log(userObj.favItems)
            }else{
                setFavItems([])
                // console.log(userObj.favItems)
            }
        }
    }, [userObj])

    const isFav = itemid => {
        let ret = false
        favItems && favItems.forEach(fi => {
          if(fi === itemid){
            ret = true
          }
        })
        return ret
    }

    const handleFavClick = itemid => {

        if(isFav(itemid)){
            setDocument(user.uid, {
            favItems: favItems.filter(fi => fi !== itemid)
            })
        }else{
            setDocument(user.uid, {
            favItems: [...favItems, itemid]
            })
        }
    }



    return (
        <div className="gallery-page w-100  mt-2 flex-col-center-start">
            <div className="row gap-1 w-100">
                {
                    items && items.map((cat) => (
                        <div key={cat.id} className="gallery-page-widget p-1-2 col-12-sm col-6-md col-4-lg flex-col-center-start">
                            <div className="imgcover">
                                <Link to={`/item/${cat.id}`}>
                                <img  className='img' src={cat.images[0].url} alt="" />
                                </Link>
                                {/* <img className='fav' src="icons/favorite_border.svg" alt="" /> */}
                                <img onClick={() => handleFavClick(cat.id)} className='fav cur-pointer' src={`/icons/${isFav(cat.id) ? "favorite" : "favorite_border"}.svg`} alt="" />
                            </div>
                            <div className="title  bg-whitesmoke  flex-row-center-between">
                                <span>{cat.name}</span>
                                <span> <span className="sale">$32</span> ${cat.price}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
