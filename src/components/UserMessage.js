
import { useEffect, useRef } from 'react'
import '../css/UserMessage.css'
import { useDocument } from '../hooks/useDocument';
import { useFirestore } from '../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { rngPassword } from '../helper/helper';


export default function UserMessage({ isOpen, setIsOpen }) {
    
    
    const { user } = useAuthContext()
    const { document: ordersObj } = useDocument('orders', user && user.uid)
    const { setDocument } = useFirestore('orders')

    const contentRef = useRef(null)

    useEffect(() => {
        contentRef.current?.scrollIntoView({behavior: 'smooth'});
    }, []);
    useEffect(() => {
        contentRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [ordersObj, isOpen]);

    // console.log(ordersObj);

    const markAsRead = (order) => {
        let ret = []
        order.messages.forEach(som => {
            let y = true
            som.read.forEach(sr => {
                if(sr === user.uid) y = false
            })
            y ? ret.push({...som, read: [...som.read, user.uid]}) : ret.push(som)
        })

        console.log(ret);
        setDocument(order.user.id, { ...order,
            messages: ret
        })
    }


    const handleSendMessage = e => {
        const m = e.target.previousElementSibling.value

        // console.log(m);
        const messages = {
            id: rngPassword(),
            createdAt: Timestamp.now(),
            sender: user.uid,
            message: m,
            read: [user.uid],
        }
        setDocument(user.uid, {
            ...ordersObj,
            messages: [...ordersObj.messages, messages],
        })
        .then(() => {
            // showToast({
            //     message: "Order Request Sent!"
            // })
            console.log('Message Sent');
            contentRef.current?.scrollIntoView({behavior: 'smooth'});
            e.target.previousElementSibling.value = ""
        })
        .catch(() => {
            // showToast({
            //     message: "An Error Occured while Sending Order Request"
            // })
            console.log('Error Sending Message');
        })

        
    }

    const handleFocus = (e) => {
        // console.log(e);
        ordersObj && markAsRead(ordersObj)
    }

    return (<>
        { isOpen && 
            <div onFocus={handleFocus} className="user-message-main bg-whitesmoke p-2 flex-col-center-between">
                <img onClick={() => setIsOpen(false)} className='close' src="/icons/xmark-solid.svg" alt="" />
                <div className="content bg-white w-100 flex-col-center-start">
                    {ordersObj && ordersObj.messages.map(msg => (
                        <span key={msg.id} className={msg.sender === user.uid ? "widget receiver bg-blue m-1-1-0-1 text-white" : "widget sender bg-whitesmoke m-1-1-0-1 "}>{msg.message}</span>
                    ))}
                    <div ref={contentRef} />
                </div>
                <div className="replybox w-100  flex-row-center-between">
                    <textarea className="input" ></textarea>
                    <img onClick={e => handleSendMessage(e)} className='bg-white p-1' src="/icons/paper-plane-solid.svg" alt="" />
                </div>
            </div>
        }
    </>)
}
