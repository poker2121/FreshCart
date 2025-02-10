import axios from 'axios'
import { useEffect, useState } from 'react'
import Slider from 'react-slick';
export default function CategorySlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplayspeed: 2000
  };



  const [categories, setCategories] = useState([]);
  async function getCategories() {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);

    setCategories(data.data);
  }

  useEffect(() => {

    getCategories();
  }, []);
  return <>
    <Slider {...settings}>
    {categories.map((category , index) => <div key={index} className='my-3'>
      <img src={category.image} alt={category.name} className='w-full h-[200px] object-cover object-top' />
      <h2 className='text-lg'>{category.name}</h2>
    </div>)}
    </Slider> 
  
  </>
}
