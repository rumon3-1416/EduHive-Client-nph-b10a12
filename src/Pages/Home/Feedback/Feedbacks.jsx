import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import Container from '../../../components/Container/Container';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SectionHeading from '../Shared/SectionHeading';
import StarRating from './StarRating';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

const Feedbacks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/feedbacks`);
      return data;
    },
  });

  return (
    <div className="bg-blueBg">
      <Container>
        <section className="pt-14 pb-6">
          <div className="text-center">
            <SectionHeading
              heading={['Student Feedback', 'Review Our Students Feedbacks']}
            />
          </div>

          <div>
            {feedbacks.length > 2 && (
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                grabCursor={true}
                freeMode={true}
                loop={true}
                modules={[Autoplay]}
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
                {feedbacks.map(feed => {
                  const { _id, feedback, name, image, title, rating } = feed;

                  return (
                    <SwiperSlide
                      className="h-full aspect-auto rounded-xl shadow-lg"
                      key={_id}
                    >
                      <div className="bg-white min-h-[17.5rem] p-6 rounded-xl">
                        <div className="mb-2 flex gap-4">
                          <img
                            className="w-12 h-12 aspect-square object-cover border-2 border-lightBlue p-0.5 rounded-full"
                            src={image}
                            alt=""
                          />
                          <div>
                            <p className="poppins-font font-semibold">{name}</p>
                            <p className="text-xs font-medium">
                              Student of EduHive
                            </p>
                          </div>
                        </div>

                        <StarRating rating={rating} />

                        <h3 className="font-medium mt-3 mb-1">{title}</h3>
                        <p className="text-sm">{feedback}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Feedbacks;
