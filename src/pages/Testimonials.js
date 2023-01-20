
import { useEffect, useState } from 'react'
import '../css/Testimonials.css'
import { useCollection } from '../hooks/useCollection'
import { Link } from 'react-router-dom';
// import testbg from '../assets/testimony-bg.png'


export default function Testimonials () {

  const { documents } = useCollection("testimony")
  const [selectedTestimonyIndex, setSelectedTestimonyIndex] = useState(0);

  const [phase1, setPhase1] = useState(false);
  const [phase2, setPhase2] = useState(false);

  const next = () => {
    
    setTimeout(() => {
      setPhase1(true)
      if(selectedTestimonyIndex >= documents.length - 1){
        setSelectedTestimonyIndex(0)
      }else{
        setSelectedTestimonyIndex(selectedTestimonyIndex + 1)
      }
      setTimeout(() => {
        setPhase2(true)
      }, 300);
    }, 300);
  }

  const prev = () => {
    setTimeout(() => {
      setPhase1(true)
      if(selectedTestimonyIndex === 0){
        setSelectedTestimonyIndex(documents.length - 1)
      }else{
        setSelectedTestimonyIndex(selectedTestimonyIndex - 1)
      }
      setTimeout(() => {
        setPhase2(true)
      }, 300);
    }, 300);

  }


  useEffect(() => {
    let t1
    let t2
    let t3

    if(documents){
      t1 = setTimeout(() => {
        t2 = setTimeout(() => {
          setPhase1(true)
          if(selectedTestimonyIndex >= documents.length - 1){
            setSelectedTestimonyIndex(0)
          }else{
            setSelectedTestimonyIndex(selectedTestimonyIndex + 1)
          }
          t3 = setTimeout(() => {
            setPhase2(true)
          }, 300);
        }, 300);
      }, 7000);
    }

    return () => {
      setTimeout(() => {
        clearInterval(t1)
        clearInterval(t2)
        clearInterval(t3)
        setPhase1(false)
        setPhase2(false)
      }, 1000);
    }

  }, [documents, selectedTestimonyIndex]);

  

  console.log(documents);
  
    return (<>
      {documents && documents.length > 0 &&
        <div className="testimonials-main w-100">
          <div className="wrapper w-100 p-2-0 flex-col-center-start">
          
            <h1 className="font-romantic header-title  text-white">Clientele Says</h1>
            <div className="image-container mt-4 flex-row-center-even w-100">
              <img onClick={prev} referrerPolicy='no-referrer' className={`onscreen-img ${phase1 && "fadeOut"} ${phase2 && "fadeIn"}`} src={selectedTestimonyIndex === 0 ? documents[documents.length - 1].writerPhotoURL : documents[selectedTestimonyIndex - 1].writerPhotoURL} alt="" />
              <div className="selected-testimony flex-col-center-start">
                <img onClick={() => setSelectedTestimonyIndex(selectedTestimonyIndex + 1)} referrerPolicy='no-referrer' className={`onscreen-img ${phase1 && "fadeOut"} ${phase2 && "fadeIn"}`} src={documents[selectedTestimonyIndex].writerPhotoURL} alt="" />
                <span className='text-white mt-1 font-kalam'>{documents[selectedTestimonyIndex].writerName} <img src="/icons/badge-check-solid.svg" alt="Verified Purchaser" title="Verified Purchaser" /> </span>
              </div>
              <img onClick={next} referrerPolicy='no-referrer' className={`onscreen-img ${phase1 && "fadeOut"} ${phase2 && "fadeIn"}`} src={selectedTestimonyIndex >= documents.length - 1 ? documents[0].writerPhotoURL : documents[selectedTestimonyIndex + 1 ].writerPhotoURL} alt="" />
            </div>
            <div className="text-container   mb-4  flex-col-center-center w-60">
              <img className="quotes left" src="/icons/quote-left-solid.svg" alt="" />
              <p className={`w-90 pt-5 pb-5 text-align-center font-kalam testimony ${phase1 && "fadeOut"} ${phase2 && "fadeIn"} `}>{documents[selectedTestimonyIndex].testimony}</p>
              <div className="flex-row-center-center">
                {documents[selectedTestimonyIndex].items.map(i => (
                  <Link target="_blank" referrerPolicy='no-refferer' to={`/item/${i.id}`} className='minitext item ml-1'>{i.name} <img src="/icons/arrow-up-right-from-square-solid.svg" alt="" /></Link>
                ))}
              </div>
              <img className="quotes right" src="/icons/quote-right-solid.svg" alt="" />
            </div>
            

          </div>
        </div>
      }
    </>)
}