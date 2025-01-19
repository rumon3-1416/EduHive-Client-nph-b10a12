import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import Container from '../../../components/Container/Container';
import Loading from '../../../components/Loading/Loading';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Slide from './Slide';
import './carousel.css';

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['slides'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/slides`);

      return data;
    },
  });

  return (
    <section className="bg-greenBg">
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
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
            {slides.length > 2 &&
              slides.map(data => (
                <SwiperSlide key={data._id}>
                  <Slide data={data} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Container>
    </section>
  );
};

export default Banner;
