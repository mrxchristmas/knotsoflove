
import { Timestamp } from "firebase/firestore"

export default function ManageSales() {

    // const x = Timestamp.fromDate(new Date(2023, 0, 26  ))

    // console.log(x.toMillis());

    


  return (
    <div className="manage-sales-main bg-red container flex-col-center-start mt-3">
        <div className="header bg-blue flex-row-center-between w-100">
            <img src="/icons/caret-left-solid.svg" alt="" />
            <h3 className="bg-white shadow-1">{`January`}</h3>
            <img src="/icons/caret-right-solid.svg" alt="" />
        </div>



    </div>
  )
}
