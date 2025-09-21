import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imagenUno from "../../../public/slider/blog_encasa.jpg";
import imagenDos from "../../../public/slider/clase.jpg";
import imagenTres from "../../../public/slider/niños_clase.jpg";

function Slider() {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner medium-size">
          <div className="carousel-item active ratio ratio-16x9">
            <img src={imagenUno} className="d-block w-100" alt="slider-uno" />
          </div>
          <div className="carousel-item ratio ratio-16x9">
            <img src={imagenDos} className="d-block w-100" alt="slider-dos" />
          </div>
          <div className="carousel-item ratio ratio-16x9">
            <img src={imagenTres} className="d-block w-100" alt="slider-tres" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Slider;
