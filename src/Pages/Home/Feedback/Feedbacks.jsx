import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useAuthContext } from '../../../Hooks/useAuthContext';
import Container from '../../../components/Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules

const Feedbacks = () => {
  const { serverUrl } = useAuthContext();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const { data } = await axios.get(`${serverUrl}/feedbacks`);
      return data;
    },
  });

  return (
    <div>
      <Container>
        <section>
          <h1 className="text-4xl font-semibold">Feedback</h1>

          <div>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {feedbacks.map(feed => (
                <SwiperSlide key={feed._id}>
                  <div className="bg-gray-200 text-center w-full h-full flex flex-col justify-center items-center">
                    <h3>{feed.title}</h3>
                    <img
                      className="w-32 aspect-square object-cover rounded-full"
                      src={feed.image}
                      alt=""
                    />
                    <p>{feed.name}</p>
                    <p>Rating : {feed.rating}</p>
                    <p>{feed.feedback}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Feedbacks;
