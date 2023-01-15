
import '../css/Gallery.css'
import banner1 from '../assets/itemimages/banner1.png'
import { useEffect, useState } from 'react'
import { scrollToTop } from '../helper/helper'
import { useIsMobile } from '../hooks/useIsMobile'
import { useCollection } from '../hooks/useCollection'
import {useSearchParams } from 'react-router-dom'
import GalleryPage from '../components/GalleryPage'

export const Gallery = ({nav, setNav, closeNav}) => {

  const { isMobile } = useIsMobile()
  const [searchParams] = useSearchParams()
  
  const { documents: categoryObj } = useCollection('category')
  const { documents: items } = useCollection('items')

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selCatItems, setSelCatItems] = useState(null)


  // console.log(categoryid);
  useEffect(() => {
    let categoryid = searchParams.get("categoryid")

    if(categoryObj){
      let ret = categoryObj[0]
      categoryObj.forEach(cat => {
        if(cat.id === categoryid){
          ret = cat
        }
      });
      setSelectedCategory(ret)
    }
  }, [categoryObj, searchParams]);


  useEffect(() => {
    if(items){
      setSelCatItems(items.filter(item => item.category === selectedCategory.id))
      searchParams.set("categoryid", selectedCategory.id)
    }
  }, [items, selectedCategory]);
  

  
  const getIsNavOpen = () => {
    if(!isMobile){
      return true
    }else{
      if(nav){
        return true
      }else{
        return false
      }
    }
  }

  


  return (
    <div className="gallery-main flex-row-start-center">

      { getIsNavOpen() && 
        <div className="gallerynav-container flex-col-center-start">
          <span className={`title ${isMobile && "flex-row-center-between w-100"}`}>Categories {isMobile && closeNav}</span>
          {selectedCategory && categoryObj && categoryObj.map((cat) => (
            <div 
              to={`/gallery/${cat.id}/`}
              key={cat.id} 
              onClick={() => {
                scrollToTop()
                setSelectedCategory(cat)
              }} 
              className={`${cat.id === selectedCategory.id && "active"} gallerynav-widget mt-1 flex-col-end-start`} 
              style={{backgroundColor: cat.color}}
            >
              <img src={cat.url} alt="" />
              {/* <ImageLoader
                url={cat.url}
              /> */}
              <span className="title">{cat.title}</span>
              <div className="peel"></div>
              <div className="peel2"></div>
              <div className="peel3"></div>
            </div>
          ))}
        </div>
      }
      <div className="gallery-container flex-col-center-start">
        <div className="gallery-header flex-col-center-start">
          <img src={banner1} alt="" />
          {/* <ImageLoader url={banner1} /> */}
          <span className="title mt-1">Premium Quality Handmade Macrame Merchandise <p>right at your fingertips</p></span>
          <div className="peel"></div>
        </div>
        {/* {NavButtonOpen} */}
        { selectedCategory && <h1 className='mt-2' onClick={() => setNav(true)} style={{backgroundColor: selectedCategory.color}}>{selectedCategory.title}</h1>}

        <GalleryPage data={selCatItems} />

      </div>
    </div>
  )
}