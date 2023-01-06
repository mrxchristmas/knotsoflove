
import pair1trans from '../assets/itemimages/pair1trans.png'
import pair2trans from '../assets/itemimages/pair2trans.png'
import pair3trans from '../assets/itemimages/pair3trans.png'

import paint1trans from '../assets/itemimages/paint1trans.png'
import paint2trans from '../assets/itemimages/paint2trans.png'
import paint3trans from '../assets/itemimages/paint3trans.png'

import { useIsMobile } from '../hooks/useIsMobile'


export default function HomeShowcase() {

    const { isMobile } = useIsMobile();

  return (
    <section className="home-showcase flex-col-center-start p-3-0">
        <a className="arrow-down-orange-xl arrow"></a>
        <div className="container mt-3 flex-col-center-start">
          <div className="title">
            <p>Discover your favorite </p>
            <p>macramé merchandise</p>
            <p>in pairs!</p>
          </div>
          <div className="subtitle mt-2">
            <p>Look through a selection of handmade macramé merchandise</p>
            <p>and discover for yourself how good they look in pairs!</p>
          </div>
        </div>
        <div className={`showcase mt-3 flex-${isMobile ? "col" : "row"}-center-center`}>
          <div className="item flex-col-center-center">
            <img className="merchbg" src={paint1trans} alt="" />
            <img className="merch" src={pair1trans} alt="" />
            <span className="merch-title">Cream of Mushroom</span>
          </div>
          <div className="item flex-col-center-center">
            <img className="merchbg" src={paint2trans} alt="" />
            <img className="merch" src={pair2trans} alt="" />
            <span className="merch-title">Cream of Berry</span>
          </div>
          <div className="item flex-col-center-center">
            <img className="merchbg" src={paint3trans} alt="" />
            <img className="merch" src={pair3trans} alt="" />
            <span className="merch-title">Cream of Eggplant</span>
          </div>
        </div>

        <button className="showcase-view btn-blue mt-5">View All</button>
      </section>
  )
}
