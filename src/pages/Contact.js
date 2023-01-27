import '../css/Contact.css'
import contactbg from '../assets/contactbgport.png'
import { Facebook, Instagram, Mail, Phone } from '../helper/iconhelper'
import logo from '../assets/logo.svg'
import logostatic from '../assets/logostatic.svg'
import { useState } from 'react'
import vcard from '../assets/vcard.png'
import { useToast } from '../hooks/useToast'
import { rngPassword, sendEmailToKaye, testEmail, testPhoneNumber } from '../helper/helper'
import anon from '../assets/anonymous.jpg'
import { Timestamp } from 'firebase/firestore'
import { useFirestore } from '../hooks/useFirestore'

export default function Contact () {

  // const { documents, error, isPending } = useColorsCollection()

  // console.log(documents);
  const { toast, showToast } = useToast(2000)
  const { setDocument } = useFirestore('orders')


  // const fblogo = "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/277579770_365233388948309_5378606251810701007_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9nEkSzeU-gYAX_a-HMn&_nc_ht=scontent-ord5-2.xx&oh=00_AfDKif-kVz6OgEkX76GlvnrzRraGAhVgd1L4yH__BYU86A&oe=63D5C029"
  const fblink = "https://www.facebook.com/knotslovebykaye"

  const [selUI, setSelUI] = useState("default");
  const [fbImg, setFbImg] = useState(true);
  const [instaImg, setInstaImg] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");


  const handleMailSubmit = () => {
    console.log(testPhoneNumber(phone) );

    
    if(name === ""){
      showToast({message: "Please provide a name"})
      return
    }
    if(!testEmail(email)){
      showToast({message: "Please provide a valid Email"})
      return
    }
    if(phone.length < 10 | phone.length > 11){
      showToast({message: "Please provide a valid Phone Number"})
      return
    }
    if(message === ""){
      showToast({message: "Please provide a short Message"})
      return
    }

    const senderFakeID = rngPassword()

    const zobj = {
      user: {
        email,
        name,
        id: senderFakeID,
        photoURL: anon
      },
      items: [],
      messages: [
        {
          createdAt: Timestamp.now(),
          id: rngPassword(),
          message: `MESSAGE FROM CONTACT PAGE, DO NOT REPLY HERE! USERS MESSAGE:>> ${message}`,
          read: [senderFakeID],
          sender: senderFakeID
        }
      ],
      fromContactPage: true,
    }

    setDocument(senderFakeID, zobj)
    .then(() => {
      const obj = { 
        name, 
        message, 
        email, 
        phone,
        callback: message => showToast({ message })
      }
      sendEmailToKaye(obj)
    })
    .catch(() => {
      showToast({ message: "An Error Occured while updating database." })
    })



    
  }

    return (
      <div  className='contact-main dark w-100 flex-col-center-start'>
        {toast}
        <div className="container mt-4 flex-row-start-start">
          <div className="left w-40 pos-relative flex-col-center-end">
            <img className='bg' src={contactbg} alt="" />

            <div className="w-80 bg-red flex-row-center-start">
              <img className='logo' src={logo} alt="" />
              <span className="font-aureta title">Knots of Love</span>
            </div>
            <p className="w-70 minitext mb-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi iste reiciendis ex deleniti qui sint quasi magni minus? </p>
            <div className="actions w-100 flex-row-center-even">
              <Facebook  onClick={() => setSelUI("fb")} className="social-icon active fb" color='grey' pathClass="path" />
              <Instagram  onClick={() => setSelUI("insta")} className="social-icon insta" color='grey' />
              <Mail  onClick={() => setSelUI("mail")} className="social-icon mail" color='grey' />
              <Phone  onClick={() => setSelUI("phone")} className="social-icon phone" color='grey' />
            </div>

          </div>
          <div className="right flex-col-center-start ml-1 w-60">
            <span className='title'>Let's get in Touch</span>
            <img className='default' src="/aaa.avif" alt="" />

            {selUI && selUI === "fb" && 
              <div className="social flex-col-center-start w-100">
                <img className={`mt-3 p-1 fb ${!fbImg && "nbrdr"}`} onClick={() => setFbImg(!fbImg)} src={fbImg ? logostatic : vcard} alt="" />
                <p className='w-70 text-align-center mt-2'>Please Like our page! come and visit us on <span className='web'>{fblink}</span> </p>
                <p className="minitext mt-2">or click on the image to show and scan QR Code</p>
              </div>
            }
            {selUI && selUI === "insta" && 
              <div className="social flex-col-center-start w-100">
                <img className={`mt-3 p-1 insta ${!instaImg && "nbrdr"}`} onClick={() => setInstaImg(!instaImg)} src={instaImg ? logostatic : vcard} alt="" />
                <p className='w-70 text-align-center mt-2'>Please Follow our page! come and visit us on <span className='web'>{`https://www.instagram.com/knotsoflovebykaye/`}</span> </p>
                <p className="minitext mt-2">or click on the image to show and scan QR Code</p>
              </div>
            }
            {selUI && selUI === "phone" && 
              <>
                <span className='mt-3 social'>Please take my Business Card</span>
                <div className="vcard shadow-4 flex-row-start-start mt-3 p-2-2 w-80">
                  <img className='' src={vcard} alt="" />
                  <div className="details ml-1 text-black flex-col-start-start">
                    <span> <b>Knots of Love by Kaye</b> </span>
                    <span className='minitext'>+1 647 784 1875</span>
                    <span className='minitext'>knotsoflove.kaye@gmail.com</span>
                    <span className='minitext'>https://knotsoflove.to</span>
                    <span className='minitext'>Ajax ON, L1S 2H8</span>
                  </div>
                </div>
              </>
            }
            {selUI && selUI === "mail" && 
              <div className="social flex-col-center-start w-70 mt-1">
                <p className="minitext w-100 mt-1">Name</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Name' className="input text-black" />
                <p className="minitext w-100 mt-1">Email Address</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email Address' className="input text-black" />
                <p className="minitext w-100 mt-1">Phone</p>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone' className="input text-black" />
                <p className="minitext w-100 mt-1">Message</p>
                <textarea className="input text-black" value={message} onChange={e => setMessage(e.target.value)} placeholder='Message'></textarea>
                <button onClick={handleMailSubmit} className="btn-blue mt-1">Submit</button>
                <p className="minitext mt-2">or send us an email at <a href="mailto:knotsoflove.kaye@gmail.com" className="web">knotsoflove.kaye@gmail.com</a></p>
              </div>
            }

              <div className="foot flex-row-center-between">
                <div onClick={() => setSelUI("fb")} className={`step ${selUI && selUI === "fb" && "active"}`}></div>
                <div onClick={() => setSelUI("insta")} className={`step ${selUI && selUI === "insta" && "active"}`}></div>
                <div onClick={() => setSelUI("mail")} className={`step ${selUI && selUI === "mail" && "active"}`}></div>
                <div onClick={() => setSelUI("phone")} className={`step ${selUI && selUI === "phone" && "active"}`}></div>
              </div>
          </div>

        </div>



      </div>
      
    )
}