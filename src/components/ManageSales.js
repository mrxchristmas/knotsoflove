
import { getDateNow, getMonthObject, getDateNowToText, dateTextToWord } from "../helper/helper"
import { useEffect, useRef, useState } from "react";
import { useSales } from "../hooks/useSales";
import staticlogo from '../assets/logostatic.svg'
import { useReactToPrint } from 'react-to-print'

export default function ManageSales() {


    const z = getDateNow()
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ]
    

    const getNextMonth = () => {
        let index = 0
        months.forEach((m,i) => {
            if(selectedMonth === m){
                if((i + 1) >= months.length){
                    index = 0
                }else{
                    index = (i + 1)
                }
            }
        })
        return `${months[index]}-01-${z.year}`
    }
    const getPrevMonth = () => {
        let index = 0
        months.forEach((m,i) => {
            if(selectedMonth === m){
                if((i - 1) < 0){
                    index = 11
                }else{
                    index = (i - 1)
                }
            }
        })
        return `${months[index]}-01-${z.year}`
    }

    const [monthObj, setMonthObj] = useState(getMonthObject( getDateNowToText() ))
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedMonthText, setSelectedMonthText] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(null)
    const [selectedWeekText, setSelectedWeekText] = useState(null)

    const [firstDate, setFirstDate] = useState(null)
    const [lastDate, setLastDate] = useState(null)
    const [salesParam, setSalesParam] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const printComponentRef = useRef(null)

    
    const { documents: sales } = useSales(salesParam)


    useEffect(() => {
        const c = [
            {
                month: "01",
                monthText: "January"
            },{
                month: "02",
                monthText: "February"
            },{
                month: "03",
                monthText: "March"
            },{
                month: "04",
                monthText: "April"
            },{
                month: "05",
                monthText: "May"
            },{
                month: "06",
                monthText: "June"
            },{
                month: "07",
                monthText: "July"
            },{
                month: "08",
                monthText: "August"
            },{
                month: "09",
                monthText: "September"
            },{
                month: "10",
                monthText: "October"
            },{
                month: "11",
                monthText: "November"
            },{
                month: "12",
                monthText: "December"
            } 
        
        ]
        
        if(monthObj && monthObj.length > 0){
            // console.log(monthObj);
            const x = monthObj[0][6].split('-')[0]
            
            let fdindex = 0
            let ldindex = 0
            setSelectedMonth(x)
            c.forEach(m => {
                if(x === m.month){
                    setSelectedMonthText(m.monthText)
                }
            })

            

            if(selectedWeek === null){ // get first and last date of month
                setSelectedWeekText("All Weeks")

                let fx = false // check if (last week of month) array is all from the same month
                monthObj[monthObj.length - 1].every((mo) => {
                    if(mo.split('-')[0] !== selectedMonth){
                        fx = true
                        return false
                    }else{
                        return true
                    }
                })

                if(fx){ // calculatoin if some dates of (last week of month) are not from same month
                    monthObj[monthObj.length - 1].every((mo, index) => {
                        if(mo.split('-')[0] !== selectedMonth){
                            // console.log('run this sht once');
                            ldindex = index - 1
                            return false
                        }else{
                            return true
                        }
                    })
                    setLastDate(monthObj[monthObj.length - 1][ldindex])
                }else{ // every date on (last week of month) are from the same month, just get last index of week
                    setLastDate(monthObj[monthObj.length - 1][6])
                }

                monthObj[0].every((mo, index) => {
                    if(mo.split('-')[0] === selectedMonth){
                        // console.log('run this sht once');
                        fdindex = index
                        return false
                    }else{
                        return true
                    }
                })



                
                

                setFirstDate(monthObj[0][fdindex])

            }else{ // get first and last date of week
                let x = false // check if selected week array is all from the same month
                monthObj[selectedWeek].every((mo) => {
                    if(mo.split('-')[0] !== selectedMonth){
                        x = true
                        return false
                    }else{
                        return true
                    }
                })
                if(x){ // some dates are from different month, lets remove them
                    monthObj[selectedWeek].every((mo, index) => {
                        if(mo.split('-')[0] === selectedMonth){
                            fdindex = index
                            return false
                        }else{
                            return true
                        }
                    })
                    if(selectedWeek !== 0){ // check if its the first week or last week that have different months
                        // last week of month calculation
                        monthObj[selectedWeek].every((mo, index) => {
                            if(mo.split('-')[0] !== selectedMonth){
                                ldindex = index - 1
                                return false
                            }else{
                                return true
                            }
                        })
                        setLastDate(monthObj[selectedWeek][ldindex])
                    }else{  // first week of month just get the last date in index
                        setLastDate(monthObj[selectedWeek][6])
                    }
                    
                    setFirstDate(monthObj[selectedWeek][fdindex])
                }else{ // all dates are from the same month
                    setFirstDate(monthObj[selectedWeek][0])
                    setLastDate(monthObj[selectedWeek][6])
                }

                let n = parseInt(selectedWeek + 1)
                let suff = ""
                if(n === 1){
                    suff = 'st'
                }else if(n === 2){
                    suff = 'nd'
                }else if(n === 3){
                    suff = 'rd'
                }else{
                    suff = 'th'
                }
                setSelectedWeekText(`${n}${suff} Week`)

            }

        }
    }, [monthObj, selectedWeek, selectedMonth]);


    useEffect(() => {
        if(sales && sales.length > 0){
            let p = 0
            sales.forEach(sale => {
                p += sale.salePrice
            })
            setTotalPrice(p)
        }
    }, [sales]);

    useEffect(() => {
        if(firstDate && lastDate){
            setSalesParam({
                first: firstDate,
                last: lastDate
            })
        }
    }, [firstDate, lastDate]);

    // console.log(sales);


    const modalTest = () => {
        console.log('aa');
        
    }

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
        copyStyles: true
    });

  return ( 
    <>
        <div className="manage-sales-print bg-white shadow-3 container flex-col-center-start mt-3 p-1-2">
            <div className="header w-100 flex-row-center-between pb-2">
                <div className="actions flex-row-center-start w-70">
                    <span className="mr-1">Invoice</span>
                    <label className="mr-1"> <input type="checkbox"/> Thank you card</label>
                    <label className="mr-1"> <input type="checkbox"/> Testimony Ticket</label>
                    <img onClick={handlePrint} className="mr-1" src="/icons/print-solid.svg" alt="" />
                    
                </div>
                <div className="flex-row-ccenter-center">
                    <img className="close" src="/icons/xmark-solid.svg" alt="" />
                </div>
            </div>
            <div className="content w-100 bg-gray p-2 flex-col-center-start">
                
                <div ref={printComponentRef} className="paper-print ">

                    <div className="paper flex-col-center-center">
                        <div className="paper-space mt-4">
                            <div className="pb-2 flex-row-start-between w-100">
                                <div className="flex-row-center-start">
                                    <img className="paper-logo" src={staticlogo} alt="" />
                                    <div className="flex-col-start-center ml-1">
                                        <h2 className="font-aureta paper-font-aureta">Knots of Love</h2>
                                        <p className="paper-sub">&nbsp;Ajax ON, L1T 2W7</p>
                                        <p className="paper-sub paper-web">&nbsp;https://knotsoflove.to</p>
                                    </div>
                                </div>
                                <div className="flex-col-start-end">
                                    <h1>INVOICE</h1>
                                    <p>{dateTextToWord(`${z.month}-${z.day}-${z.year}`, "MMMM DD, YYYY")}</p>
                                </div>
                            </div>
                            <h1>Knots Of Love</h1>
                            <p>Maker of premium quality handmade macrame products</p>
                            <div className="flex-row-center-between w-100 mt-3 paper-border-top">
                                <div className="flex-col-start-start">
                                    <h4>Bill to</h4>
                                    <p>John Snow</p>
                                    <p>john.snow_wethenorth@gmail.com</p>
                                </div>
                                <div className="flex-col-end-start">
                                    <h4>Payment</h4>
                                    <p>$45.00</p>
                                </div>
                            </div>
                            <div className="flex-col-center-start mt-2 paper-border-top w-100">
                                <div className="w-100 p-1 flex-row-center-between">
                                    <div className="paper-col-item flex-col-start-center">
                                        <h4>Item</h4>
                                    </div>
                                    <div className="paper-col-price flex-col-center-center">
                                        <h4>Price</h4>
                                    </div>
                                    <div className="paper-col-amount flex-col-center-center">
                                        <h4>Amount</h4>
                                    </div>
                                </div>
                                <div className="w-100 flex-row-center-between paper-border-top p-1">
                                    <div className="paper-col-item flex-col-start-center">
                                        <p>Makuna Hatata</p>
                                    </div>
                                    <div className="paper-col-price flex-col-center-center">
                                        <p>$59</p>
                                    </div>
                                    <div className="paper-col-amount flex-col-center-center">
                                        <p>$57</p>
                                    </div>
                                </div>
                                <div className="w-100 flex-row-center-between paper-border-top p-1">
                                    <div className="paper-col-item flex-col-start-center">
                                        <p>Makuna Hatata</p>
                                    </div>
                                    <div className="paper-col-price flex-col-center-center">
                                        <p>$59</p>
                                    </div>
                                    <div className="paper-col-amount flex-col-center-center">
                                        <p>$57</p>
                                    </div>
                                </div>
                                <div className="w-100 flex-row-center-between paper-border-top p-1">
                                    <p>Shipping</p>
                                    <p>$12</p>
                                </div>
                                <div className="w-100 flex-row-center-between">
                                    <h4>Total</h4>
                                    <p>$125</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="paper flex-col-center-center">
                        <div className="paper-space mt-4 flex-col-start-start">
                            <span>{dateTextToWord(`${z.month}-${z.day}-${z.year}`, "MMMM DD, YYYY")}</span>
                            <p className="mt-2">Kaye ExPression Frianeza</p>
                            <p className="">Knots of Love by Kaye</p>
                            <p className="">knotsoflove.to</p>
                            <p className="mt-3">Dear Jessa,</p>
                            <p className="mt-1">Hello Friend! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus autem impedit, corporis dolorum voluptas, praesentium error voluptatibus non recusandae accusantium nihil doloremque aut porro eligendi accusamus nulla a quisquam neque. Lorem</p>
                            <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione debitis necessitatibus at?</p>
                            <p className="mt-5">Sincerely,</p>
                            <p className="font-aureta paper-font-aureta">Kaye Expression Frianeza</p>
                        </div>
                    </div>
                    
                    <div className="paper flex-col-center-center">
                        <div className="paper-space mt-4 flex-col-center-start">
                            <img src={staticlogo} alt="" className="paper-testimony-header" />
                            <h1 className="font-aureta paper-font-aureta huge paper-z1 mt-4">Knots of Love</h1>
                            <p className="paper-z1">by Kaye</p>
                            <p className="mt-3 text-align-center">is excited to announce that </p>
                            <p className="text-align-center">you have been selected to write a <b>Testimony</b> on our website regarding your thoughts on the product/s you bought!</p>
                            <p className="w-100 mt-5">To participate, please follow this link <span className="web">https://knotsoflove.to/writetestimony</span> 
                            &nbsp;or scan the image below. Please login to your Account when you visit the link. </p> 
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div className="manage-sales-main container flex-col-center-start mt-3">
            <div className="header flex-row-center-between w-50">
                <img onClick={() => {
                    setSelectedWeek(null)
                    setMonthObj(getMonthObject( getPrevMonth() ))
                }} src="/icons/caret-left-solid.svg" alt="" />
                <h3 className="bg-white shadow-1">{selectedMonthText} {z.year}</h3>
                <img onClick={() => {
                    setSelectedWeek(null)
                    setMonthObj(getMonthObject( getNextMonth() ))
                }} src="/icons/caret-right-solid.svg" alt="" />
            </div>
            <div className="weekheader flex-row-center-center w-30">
                {firstDate && lastDate && <h3 className="bg-white shadow-1">{dateTextToWord(firstDate)} - {dateTextToWord(lastDate)}</h3>}
            </div>
            <div className="weekheader flex-row-center-between w-30">
                <img onClick={() => {
                    selectedWeek === null ? setSelectedWeek(monthObj.length - 1) :
                    selectedWeek - 1 < 0 ? setSelectedWeek(null) : 
                    setSelectedWeek(selectedWeek - 1) 
                }} src="/icons/caret-left-solid.svg" alt="" />
                <h3 className="bg-white shadow-1">{selectedWeekText}</h3>
                <img onClick={() => {
                    selectedWeek === null ? setSelectedWeek(0) :
                    selectedWeek + 1 > monthObj.length - 1 ? setSelectedWeek(null) : 
                    setSelectedWeek(selectedWeek + 1) 
                }} src="/icons/caret-right-solid.svg" alt="" />
            </div>

            <div className="list flex-col-center-start w-70 mt-2">
                {sales && sales.length > 0 ? sales.map(sale => (
                    <div key={sale.id} className="widget bg-white flex-col-center-start w-90 p-1">
                        <div className="flex-row-center-between w-100">
                            <span>{sale.item.name}</span>
                            {sale.salePrice === parseFloat(sale.item.price) ? 
                                <span>${sale.salePrice}</span> :
                                <span><span className="sale">${sale.item.price}</span>  ${sale.salePrice}</span>
                            }
                        </div>
                        <div className="flex-row-center-between w-100">
                            <span className="sub">Sold to: {sale.buyerName}</span>
                            <span className="sub">{new Date(sale.createdAt.toDate()).toDateString()}</span>
                        </div>
                    </div>
                    )) : 
                    <div className="widget bg-white flex-row-center-between w-90 p-1">
                        <span>No Sales Record</span>
                    </div>
                }
                <div className="widget bg-white flex-row-center-between w-90 p-1">
                    <h4>Total</h4>
                    <span>${totalPrice}</span>
                </div>
                <button className="btn-green mt-1" onClick={() => modalTest()}>Show Modal</button>
            </div>
        </div>
    </>
  )
}
