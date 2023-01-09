
import { thread_colors } from '../helper/helper'


export default function HomeColors() {
  return (
    <div className="colors-main mt-3 flex-col-center-start p-2">
        <h1>Look through our Available Colors</h1>
        <div className="colors-page w-100  mt-2 flex-col-center-center">
          <div className="row gap-1 w-100">
            {
              thread_colors && thread_colors.map((color, index) => (
                <div key={index} className="colors-page-widget p-1-2 col-4-sm col-3-md col-2-lg flex-col-center-center">
                  <div className="imgcover">
                    <img src={color.img} alt="" />
                  </div>
                  <div className={`title flex-row-center-center ${!color.available && "text-gray"}`}>
                    <span>{color.name.replaceAll('_', ' ')}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div> 
  )
}
