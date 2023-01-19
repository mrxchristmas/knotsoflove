import { useEffect, useRef, useState } from "react"
import { useCollection } from "../hooks/useCollection"
// import { useImage } from '../hooks/useImage'
import { useAuthContext } from "../hooks/useAuthContext"
import { Timestamp } from "firebase/firestore"
import { rngPassword } from "../helper/helper"
import { useFirestore } from "../hooks/useFirestore"
import { usePrompt } from "../hooks/usePrompt"
import { useToast } from "../hooks/useToast"

export default function ManageMessages() {

    const { documents } = useCollection('orders')
    const { user } = useAuthContext()
    const { setDocument, deleteDocument } = useFirestore('orders')
    const { addDocument : addSalesDocument } = useFirestore('sales')

    const { prompt, promptChoice } = usePrompt()
    const { toast, showToast } = useToast()

    const [orders, setOrders] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const contentRef = useRef()

    // const { ImageLoader } = useImage()
    // console.log(orders);

    useEffect(() => {
        if(documents){
            console.log(documents);
            setOrders(documents)
            contentRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [documents]);

    useEffect(() => {
        contentRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [isSettingsOpen]);


    useEffect(() => {
        if(selectedOrder){
            orders.forEach(o => {
                if(o.id === selectedOrder.id){
                    setIsSettingsOpen(false)
                    setSelectedOrder(o)
                    setConversation(o.messages.sort((a,b) => a.createdAt < b.createdAt))
                    contentRef.current?.scrollIntoView({behavior: 'smooth'});
                }
            })
        }
    }, [selectedOrder, orders]);

    const getNotif = (order) => {
        let x = 0
        order.messages.forEach(om => {
            let y = true
            om.read.forEach(id => {
              if(id === user.uid) y = false
            })
            y && x++
        })
        return x
    }

    const handleSendMessage = e => {
        const m = e.target.previousElementSibling.value

        const messages = {
            id: rngPassword(),
            createdAt: Timestamp.now(),
            sender: user.uid,
            message: m,
            read: [user.uid],
        }
        setDocument(selectedOrder.user.id, { ...selectedOrder,
            messages: [...selectedOrder.messages, messages]
        })
        .then(() => {
            console.log('ok');
            e.target.previousElementSibling.value = ""
        })
        .catch(() => {
            console.log('err');
        })
    }

    const handleMarkAsRead = () => {
        let ret = []
        selectedOrder.messages.forEach(som => {
            let y = true
            som.read.forEach(sr => {
                if(sr === user.uid) y = false
            })
            y ? ret.push({...som, read: [...som.read, user.uid]}) : ret.push(som)
        })

        console.log(ret);
        setDocument(selectedOrder.user.id, { ...selectedOrder,
            messages: ret
        })
    }

    const handleRemoveItemClick = itemid => {
        // console.log(itemid);
        promptChoice("Confirm remove of this item")
        .then(() => {
            setDocument(selectedOrder.user.id, { ...selectedOrder,
                items: selectedOrder.items.filter(i => i.id !== itemid)
            })
            .then(() => {
                console.log('ok');
            })
            .catch(() => {
                console.log('err');
            })
        })
        .catch(() => {

        })
    }

    const handleSaleCompleteClick = (e, item) => {
        const p = e.target.previousElementSibling.value
        const data = {
            buyerid: selectedOrder.user.id,
            buyerName: selectedOrder.user.name,
            item: item,
            itemid: item.id,
            salePrice: p === "" ? parseFloat(item.price) : parseFloat(p),
            receiptTag: selectedOrder.receiptTag
        }
        // console.log(data);
        addSalesDocument(data).then(() => {
            showToast({
                message: "Successfully Added Sales Record..."
            })

            let ret = []
            selectedOrder.items.forEach(soi => {
                let y = false
                if(soi.id === item.id) y = true
                y ? ret.push({...soi, isSold: true}) : ret.push(soi)
            })
            // console.log(ret);
            setDocument(selectedOrder.user.id, { ...selectedOrder,
                items: ret
            })
            .then(() => {
                showToast({
                    message: "Sale Completed! Invoice Management will show at Sales"
                })
            })
            .catch(() => {
                showToast({
                    message: "An Error has Occured while updating Item State"
                })
            })
        })
        .catch(() => {
            showToast({
                message: "An Error has Occured while adding Sales Record..."
            })
        })
    }

    const handleOrderCloseClick = () => {
        console.log(selectedOrder)
        promptChoice("Confirm Close Order")
        .then(() => {

            const nd = {
                id: selectedOrder.id,
                items: selectedOrder.items,
                messages: selectedOrder.messages,
                user: selectedOrder.user
            }
            setDocument(selectedOrder.id, {...nd,
                isClosed: true
            })
            .then(() => {
                showToast({message: "Order Successfully Closed"})
            })
            .catch((err) => {
                showToast({message: `There was an error Closing the Order: ${err.message }`})
            })
        })
    }

    const handleOrderDeleteClick = () => {
        promptChoice("Confirm Delete Record")
        .then(() => {
            deleteDocument(selectedOrder.id)
            .then(() => {
                showToast({message: "Record Successfully Deleted"})
                setSelectedOrder(null)
                setIsSettingsOpen(false)
            })
            .catch((err) => {
                showToast({message: `There was an error Deleting the Record: ${err.message }`})
            })
        })
    }

    return (
        <div className="manage-messages-main container mt-3 flex-row-start-between">
            {prompt}
            {toast}
            <div className="left bg-white">
                {orders && orders.length > 0 ? orders.map(order => (
                    <div onClick={() => setSelectedOrder(order)} key={order.id} className="widget p-1 bg-red flex-row-center-start">
                        {getNotif(order) > 0 && <p className="counter flex-col-center-center">{getNotif(order)}</p>}
                        {/* <ImageLoader url={order.user.photoURL} /> */}
                        <img src={order.user.photoURL} alt="" />
                        <span>{order.user.name}</span>
                    </div>
                )) : <div className="widget p-1 bg-red flex-row-center-center">
                    <span>No Orders</span>
                </div>
            
            }
            </div>
            <div className="right flex-col-center-start">
                {selectedOrder && conversation && <>
                    <div className="header  bg-white flex-row-center-between">
                        <span className="name">{selectedOrder.user.name}</span>
                        <div className="flex-row-center-center">
                            {getNotif(selectedOrder) > 0 && <span onClick={() => handleMarkAsRead()} className="markasread mr-1">mark as read</span>}
                            <img onClick={() => setIsSettingsOpen(!isSettingsOpen)} src={`/icons/${isSettingsOpen ? "envelope-solid" : "settings_black_48dp"}.svg`} alt="" />
                        </div>
                    </div>
                    {!isSettingsOpen && 
                        <div className="content bg-white flex-col-center-start">
                            {conversation.map(msg => (
                                <span key={msg.id} className={`bubble  ${msg.sender === user.uid ? "receiver bg-blue text-white" : "sender bg-whitesmoke"}`}>{msg.message}</span>
                            ))}
                            <div ref={contentRef} />
                        </div>
                    }{isSettingsOpen && 
                        <div className="content bg-white flex-col-start-start">
                            <p className="minitext mt-1 text-red">{`*Please input sale price of the item if discounted -- before you click on "Sale Complete", if not, it will be defaulted to its original price`}</p>
                            <p className="minitext ">{`*All Sales will be shown under Management > Sales`}</p>
                            <p className="minitext ">{`*Close orders after checkout or if cancelled by the buyer.`}</p>
                            {selectedOrder && selectedOrder.items.map(soi => (
                                <div key={soi.id} className="mmmrcq-items-widget w-100 flex-col-start-start">
                                    <span className="name">{soi.name} - ${soi.price}</span>
                                    <div className="button-action-container pb-1 w-100 flex-row-center-start">
                                        {!soi.isSold && <>
                                            <button onClick={() => handleRemoveItemClick(soi.id)} className="btn-red mr-1">Remove Item</button>
                                            <span className="mr-1 ml-2">$</span>
                                            <input className="input" type="number" placeholder={soi.price} />
                                        </>}
                                        {soi.isSold ? <button disabled className="btn-blue mr-1">Sale Completed</button>
                                         : <button onClick={e => handleSaleCompleteClick(e, soi)} className="btn-green mr-1">Sale Complete</button>}
                                    </div>
                                </div>
                            ))}
                            {selectedOrder && !selectedOrder.isClosed && 
                                <button onClick={() => handleOrderCloseClick()} className="btn-black text-white mt-1">Close Order</button>
                            }
                            <button onClick={() => handleOrderDeleteClick()} className="btn-red text-white mt-1">Delete Message Record</button>
                        </div> 
                    }

                    <div className="replybox mt-1 flex-row-center-between">
                        {selectedOrder && selectedOrder.isClosed ? <>
                            <textarea disabled={true} className="input" placeholder="Order is Closed" ></textarea>
                            <img className="closed" src="/icons/paper-plane-solid.svg" alt="" />
                        </> : <>
                            <textarea disabled={isSettingsOpen} className="input"></textarea>
                            <img onClick={e => {!isSettingsOpen && handleSendMessage(e)}} src="/icons/paper-plane-solid.svg" alt="" />
                        </>}
                    </div>
                </>}
            </div>
        </div>
    )
}
