import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import banner1 from '../../assets/images/grocery-banner.png'
import banner2 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplayspeed: 2000
  };

  return <>
  <div className="flex">
    <div className="w-3/4">
    <Slider {...settings}>
      <img src={slide1} className='w-full h-[500px] object-cover' alt="" />
      <img src={slide2} className='w-full h-[500px] object-cover' alt="" />
      <img src={slide3} className='w-full h-[500px] object-cover' alt="" />
    </Slider>  
    </div>
    <div className="w-1/4">
    <img src={banner1} className='w-full h-[250px]' alt='' />
    <img src={banner2} className='w-full h-[250px]' alt='' />
    </div>
  </div>
  
  </>
}
