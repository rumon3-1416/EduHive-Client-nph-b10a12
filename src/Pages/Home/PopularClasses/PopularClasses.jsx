import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

import Container from '../../../components/Container/Container';
import PopClassCard from './PopClassCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SectionHeading from '../Shared/SectionHeading';

import 'swiper/css';
import 'swiper/css/free-mode';

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: popularClasses = [] } = useQuery({
    queryKey: ['popular-classes'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/classes?popular=true&limit=6`);

      return data.classes;
    },
  });

  return (
    <div className="bg-greenBg pt-14 pb-6">
      <Container>
        <section id="popular_classes">
          <div className="text-center">
            <SectionHeading
              heading={['Our Popular Classes', 'Explore Our Popular Classes']}
            />
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            grabCursor={true}
            freeMode={true}
            modules={[FreeMode, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 17,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 23,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper pb-6"
          >
            {popularClasses.length > 2 &&
              popularClasses.map(popClass => (
                <SwiperSlide
                  className="rounded-2xl aspect-auto h-full shadow-lg"
                  key={popClass._id}
                >
                  <PopClassCard popClass={popClass} />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </Container>
    </div>
  );
};

export default PopularClasses;
