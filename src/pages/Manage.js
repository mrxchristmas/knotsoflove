import { NavLink, Outlet } from "react-router-dom";
// import { useCategory } from "../hooks/useCategory"
import { useIsMobile } from "../hooks/useIsMobile";
import { useState } from "react";

export default function Manage() {

    // const { setNoNav: setNoNavMain } = useOutletContext()
    const { isMobile } = useIsMobile()
    const [navOpen, setNavOpen] = useState(false);
    const [navTitle, setNavTitle] = useState("Open Nav");



    // console.log(showcase);
    
    // const [categoryObj, setCategoryObj] = useState(_categoryObj);

    // console.log(categoryObj);

    const handleNavClick = title => {
      setNavTitle(title)
      setNavOpen(false)
    }

  return (
    <div className="manager-main mt-2 flex-col-center-start p-0-2">
        {(isMobile === true && navOpen === true) &&
          <div className={`${isMobile ? " mobile flex-col-start-start" : " w-100 flex-row-center-center"} bg-blue manager-nav`}>
              {isMobile && <img onClick={() => setNavOpen(false)} className="close p-1" src="/icons/xmark-solid.svg" alt="" /> }
              <br />
              <NavLink onClick={() => handleNavClick("Category")} to="/manage/category" className="m-0-1">Category</NavLink>
              <NavLink onClick={() => handleNavClick("Merchandise")} to="/manage/item" className="m-0-1">Merchandise</NavLink>
              <NavLink onClick={() => handleNavClick("Sales")} to="/manage/sales" className="m-0-1">Sales</NavLink>
              <NavLink onClick={() => handleNavClick("Discount")} to="/manage/discount" className="m-0-1">Discount</NavLink>
              <NavLink onClick={() => handleNavClick("Colors")} to="/manage/colors" className="m-0-1">Colors</NavLink>
              <NavLink onClick={() => handleNavClick("Messages")} to="/manage/messages" className="m-0-1">Messages</NavLink>
          </div>
        }
        {isMobile && 
          <span onClick={() => {
            setNavOpen(true)
          }} className="mt-2 p-1 bg-white w-100 text-align-center br-sm shadow-1">{navTitle}</span>
        }

        {!isMobile &&
          <div className="w-100 flex-row-center-center manager-nav">
            <NavLink onClick={() => handleNavClick("Category")} to="/manage/category" className="m-0-1">Category</NavLink>
            <NavLink onClick={() => handleNavClick("Merchandise")} to="/manage/item" className="m-0-1">Merchandise</NavLink>
            <NavLink onClick={() => handleNavClick("Sales")} to="/manage/sales" className="m-0-1">Sales</NavLink>
            <NavLink onClick={() => handleNavClick("Discount")} to="/manage/discount" className="m-0-1">Discount</NavLink>
            <NavLink onClick={() => handleNavClick("Colors")} to="/manage/colors" className="m-0-1">Colors</NavLink>
            <NavLink onClick={() => handleNavClick("Messages")} to="/manage/messages" className="m-0-1">Messages</NavLink>
          </div> 
        }

        <Outlet />
    </div>
  )
}
