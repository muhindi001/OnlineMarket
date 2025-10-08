import Slider from 'react-slick'
import React from 'react'



const TestimonialData = [
  {
    id: 1,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, ",
    img: "https://picsum.photos/101/101"
  },
  {
    id: 2,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, consectetur",
    img: "https://picsum.photos/202/202"
  },
  {
    id: 3,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, consectetur",
    img: "https://picsum.photos/303/303"
  },
  {
    id: 4,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, consectetu",
    img: "https://picsum.photos/404/404"
  },
  {
    id: 5,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    img: "https://picsum.photos/505/505"
  },
  {
    id: 6,
    name: "Muhindi",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    img: "https://picsum.photos/300/200"
  },
];

const Testmonials = () => {
  var settings ={
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='py-10 mb-10'>
        <div className='container mx-auto'>
        {/* header section */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
        <p data-aos='fade-up' className='text-sm text-primary font-semibold'>What our customers are saying</p>
        <h1 data-aos='fade-up' className='text-3xl font-bold'>Testimonial</h1>
        <p data-aos='fade-up' className='text-xs text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Officia nisi ratione neque quasi exercitationem. Quia quaerat 
        </p>
        </div>
        {/* Testimonial slider with 3 cards per slide */}
        <div data-aos='zoom-in'>
          <Slider
            dots={true}
            arrows={false}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2500}
            cssEase='linear'
            pauseOnHover={true}
            pauseOnFocus={true}
            responsive={[{
              breakpoint: 1024,
              settings: { slidesToShow: 2 }
            }, {
              breakpoint: 640,
              settings: { slidesToShow: 1 }
            }]}
          >
            {TestimonialData.map((data) => (
              <div
                key={data.id}
                className='flex flex-col items-center gap-8 shadow-xl py-8 px-6 rounded-2xl border border-gray-200 bg-white
                 dark:bg-gray-900 relative transition-transform duration-200 hover:scale-105 mx-8 min-h-[200px] max-h-[200px] w-[200px] flex-shrink-0'
              >
                <div className='mb-4'>
                  <img src={data.img} alt="" className='w-20 h-20 rounded-full border-4 border-primary shadow-md object-cover' />
                </div>
                <div className='flex flex-col gap-4 items-center'>
                  <div className='space-y-2'>
                    <p className='text-base italic text-gray-600 dark:text-gray-300 mb-2'>{data.text}</p>
                    <h1 className='text-lg font-semibold text-primary dark:text-white'>{data.name}</h1>
                  </div>
                </div>
                <p className='text-primary/20 text-7xl font-serif absolute top-2 right-6 dark:text-primary/40'>
                  &ldquo;
                </p>
              </div>
            ))}
          </Slider>
        </div>
        </div>
    </div>
  )
}

export default Testmonials