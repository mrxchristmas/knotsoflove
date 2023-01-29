
import { useIsMobile } from "../hooks/useIsMobile"
import { scrollToTop } from '../helper/helper'


export default function Footer() {

    const { isMobile } = useIsMobile()

  return (
    <footer onClick={() => scrollToTop()} className={`footer bg-pink text-white flex-row-center-${isMobile ? "center mobile" : "between"}`}>
      {!isMobile && <span>Terms and Conditions</span>}
      <span className="flex-row-center-center"><span className="big">®</span><span className="font-aureta">Knots of Love</span>&nbsp; by &nbsp;<b>Kaye™</b> &nbsp;&nbsp; ©2023</span>
      {!isMobile && <span >Back to Top</span>}
    </footer>
  )
}
