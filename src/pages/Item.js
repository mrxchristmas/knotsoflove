import '../css/Item.css'
import item1 from '../assets/itemimages/item1.png'
import color1 from '../assets/colors/flamingo.png'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Item() {
    const { isMobile } = useIsMobile()

  return (
    <div className="item-main w-100 mt-3 flex-col-center-center">
        <div className={`item-details-container flex-${isMobile ? "col-center-start" : "row-start-between"} `}>
            <div className={`item-image-container flex-${isMobile ? "colr-center" : "row-start"}-between`}>
                <div className={`item-thumbnails-container flex-${isMobile ? "row" : "col"}-center-start`}>
                    <img src={item1} alt="" />
                    <img src={item1} alt="" />
                    <img src={item1} alt="" />
                </div>
                <img className='item-image' src={item1} alt="" />
            </div>
            <div className="item-description-container flex-col-start-start">
                <span className='title flex-row-center-between w-100'>Product Name <p>$12</p></span>
                <h4>Description</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor veritatis sunt nisi. Aliquid soluta facilis beatae incidunt atque natus nisi, voluptas tempora. Deserunt fugit iure repellendus vel earum excepturi facilis?</p>
                <h4>Colors Used</h4>
                <div className="colors flex-row-center-start">
                    <img src={color1} alt="Flamingo" title="Flamingo" />
                    <img src={color1} alt="Flamingo" title="Flamingo" />
                    <img src={color1} alt="Flamingo" title="Flamingo" />
                    <img src={color1} alt="Flamingo" title="Flamingo" />
                </div>
                <h4>Width</h4>
                <p>7.8cm</p>
                <h4>Soletype</h4>
                <p>Abaca</p>
                <h4>Size</h4>
                <p>8.5 (us women)</p>
                {/* <input type="text" className="input" /> */}
                <p className="minitext text-red">Please include where you want to be contacted back (eg. phone, email, or in app)</p>
                <textarea className="input" placeholder='ask a question or a special request eg(colors, size, etc.)'></textarea>
                <button className="btn-gray">Submit Order Request</button>
            </div>
        </div>
        <div className="frequent flex-col-start-start ">
            <h3>Customers frequently viewed</h3>
            <div className="frequent-widget-container mt-1 flex-row-center-start">
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
            </div>
            
        </div>
        <div className="frequent flex-col-start-start ">
            <h3>Customers Most Ordered</h3>
            <div className="frequent-widget-container mt-1 flex-row-center-start">
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
                <div className="frequent-widget flex-col-center-center">
                    <img src={item1} alt="" />
                    <span>Item 1 Title</span>
                </div>
            </div>
            
        </div>
    </div>
  )
}
