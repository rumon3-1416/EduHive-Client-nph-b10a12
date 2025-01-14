import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '../../../Hooks/useAuthContext';
import Container from '../../../components/Container/Container';
import Loading from '../../../components/Loading/Loading';
import Slide from './Slide';
import './carousel.css';

const Banner = () => {
  const { serverUrl } = useAuthContext();

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['slides'],
    queryFn: async () => {
      const { data } = await axios.get(`${serverUrl}/slides`);

      return data;
    },
  });

  return (
    <section className="bg-greenBg">
      <Container>
        {!isLoading ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {slides.map(data => (
              <SwiperSlide key={data._id}>
                <Slide data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loading />
        )}
      </Container>
    </section>
  );
};

export default Banner;
