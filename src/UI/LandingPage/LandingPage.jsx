import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./landingPage.css";
import Navbar from "./Navbar";
import Video from "./Video";
import Info from "./Info";
import Steps from "./Steps";
import Banner from "./Banner";
import Footer from "./Footer";
import { useRef } from "react";

function LandingPage() {

  const infoRef = useRef(null);

  const scrollToInfo = () => {
    infoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onAcercaClick={scrollToInfo}/>
      <Video onAcercaClick={scrollToInfo}/>
      <Info sectionRef={infoRef}/>
      <Steps />
      <Banner />
      <Footer />
    </>
  );
}

export default LandingPage;
