import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Slider = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTfjh7ErQkxlb1FEDzfyM3UoK4iy8DF7ydx6dQggYddX575ftR5Dy05kbASk3FORDJ0_hIrrEk1rU5D3i-AzvYB2eRl4fZyG9hz8kyj8jRo',
    'https://media.designcafe.com/wp-content/uploads/2022/03/02170401/contemporary-dining-room-design-ideas.jpg',
    'https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg',
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        speed={1000}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <h2
                  style={{
                    fontSize: '36px',
                    marginBottom: '20px',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  Explore Beautiful Furniture
                </h2>
                <a
                  href="#product-list"
                  style={{
                    textDecoration: 'none',
                    padding: '10px 20px',
                    backgroundColor: '#ff5733',
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                  }}
                >
                  Shop Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
