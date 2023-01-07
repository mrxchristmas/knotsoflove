
import '../css/Products.css'
import { categoryObj } from '../helper/helper'
import banner1 from '../assets/itemimages/banner1.png'

export default function Products () {
    return (
      <div className="products-main flex-row-start-center">
        <div className="catnav-container flex-col-center-start">
          <span className="title">Categories</span>
          
          {categoryObj && categoryObj.map((cat, index) => (
            <div key={index} className="catnav-widget mt-1 flex-col-end-start " style={{backgroundColor: cat.color}}>
              <img src={cat.img} alt="" />
              <span className="title">{cat.title}</span>
              <div className="peel"></div>
              <div className="peel2"></div>
              <div className="peel3"></div>
            </div>
          ))}

          
        </div>
        <div className="prodcuts-container">
          <div className="products-header flex-col-center-start">
            <img src={banner1} alt="" />
            <span className="title mt-1">Premium Quality Handmade Macrame Merchandise <p>right at your fingertips</p></span>
            <div className="peel"></div>
          </div>

          

        </div>
      </div>
    )
}