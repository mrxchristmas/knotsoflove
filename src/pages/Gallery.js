
import '../css/Gallery.css'
import { categoryObj, categoryItemObj, getItemsFromCatId } from '../helper/helper'
import banner1 from '../assets/itemimages/banner1.png'
import { useEffect, useState } from 'react'
import { scrollToTop } from '../helper/helper'
import { useIsMobile } from '../hooks/useIsMobile'
// import { useNav } from '../hooks/useNav'

export const Gallery = ({nav, setNav, closeNav}) => {

  const { isMobile } = useIsMobile()
  // const {nav, NavButtonOpen, NavButtonClose, setNav} = useNav()
  const [selectedCategory, setSelectedCategory] = useState(categoryObj[0]);
  const [categoryItems, setCategoryItems] = useState(categoryItemObj[0].items);

  // const [isNavOpen, setIsNavOpen] = useState(false);
  // const testFunc = () => {
  //   if(isMobile && nav){
      
  //   }
  // }
  // const closeNavIfCatChanged = useMemo(() =>  testFunc(), [])

  useEffect(() => {
    
    setCategoryItems(getItemsFromCatId(selectedCategory.id))
    setNav(false)
  }, [selectedCategory, isMobile, setNav]);

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
          {categoryObj && categoryObj.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => {
                setSelectedCategory(cat)
                scrollToTop()
              }} 
              className={`${cat.title === selectedCategory.title && "active"} gallerynav-widget mt-1 flex-col-end-start`} 
              style={{backgroundColor: cat.color}}
            >
              <img src={cat.img} alt="" />
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
          <span className="title mt-1">Premium Quality Handmade Macrame Merchandise <p>right at your fingertips</p></span>
          <div className="peel"></div>
        </div>
        {/* {NavButtonOpen} */}
        <h1 className='mt-2' onClick={() => setNav(true)} style={{backgroundColor: selectedCategory.color}}>{selectedCategory.title}</h1>

        <div className="gallery-page w-100  mt-2 flex-col-center-start">
          <div className="row gap-1 w-100">
            {
              categoryItems && categoryItems.map((cat) => (
                <div key={cat.id} className="gallery-page-widget p-1-2 col-12-sm col-6-md col-4-lg flex-col-center-start">
                  <div className="imgcover">
                    <img src={cat.images[0]} alt="" />
                  </div>
                  <div className="title  bg-whitesmoke  flex-row-center-between">
                    <span>{cat.title}</span>
                    <span>${cat.price}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}