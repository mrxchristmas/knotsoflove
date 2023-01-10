import { NavLink, Outlet } from "react-router-dom";
// import { useCategory } from "../hooks/useCategory"

export default function Manage() {

    // const { showcase } = useCategory()


    // console.log(showcase);
    
    // const [categoryObj, setCategoryObj] = useState(_categoryObj);

    // console.log(categoryObj);

  return (
    <div className="manager-main flex-col-center-start p-2">
        <div className="manager-nav w-100 flex-row-center-center">
            <span className="m-0-1">Merchandise</span>
            <span className="m-0-1">Testimonials</span>
            <span className="m-0-1">Colors</span>
            <span className="m-0-1">Home Page</span>
            <span className="m-0-1">Discounts</span>
            <NavLink to="/manage/category" className="m-0-1">Category</NavLink>
        </div>
        <Outlet />
    </div>
  )
}
