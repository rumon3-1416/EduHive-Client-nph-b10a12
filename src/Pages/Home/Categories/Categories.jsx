import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LuArrowUpRight } from 'react-icons/lu';
import Container from '../../../components/Container/Container';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

import webIcon from '../../../assets/icons/code.png';
import graphicIcon from '../../../assets/icons/layers.png';
import digitalIcon from '../../../assets/icons/ads.png';
import dataIcon from '../../../assets/icons/data-engineer.png';
import SectionHeading from '../Shared/SectionHeading';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const Categories = () => {
  const { darkTheme } = useAuthContext();
  const axiosPublic = useAxiosPublic();

  const { data: Categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/categories');
      return data;
    },
  });

  return (
    <section className="bg-blueBg pt-16 pb-8">
      <Container>
        <div className="text-center">
          <SectionHeading
            heading={['Categories', 'Explore Class Categories']}
          />
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 items-center gap-6">
          {!isLoading &&
            Categories.map(category => (
              <div
                className={`text-center p-6 hover:shadow-xl rounded-2xl
              ${darkTheme ? 'hover:bg-dark5' : 'hover:bg-white'}`}
                key={category._id}
              >
                <div
                  className={`size-20 p-4 mb-6 mx-auto rounded-full flex justify-center items-center ${
                    category?.category?.includes('Web')
                      ? 'bg-[#be8fff77]'
                      : category?.category?.includes('Graphic')
                      ? 'bg-[#ff91b04a]'
                      : category?.category?.includes('Digital')
                      ? 'bg-[#5fbcff4a]'
                      : category?.category?.includes('Data')
                      ? 'bg-[#6dff6d4f]'
                      : ''
                  }`}
                >
                  <img
                    className="w-full"
                    src={
                      category?.category?.includes('Web')
                        ? webIcon
                        : category?.category?.includes('Graphic')
                        ? graphicIcon
                        : category?.category?.includes('Digital')
                        ? digitalIcon
                        : category?.category?.includes('Data')
                        ? dataIcon
                        : ''
                    }
                    alt=""
                  />
                </div>
                <h3
                  className={`text-2xl font-semibold mb-4
                ${darkTheme ? 'text-light2' : 'text-gray-800'}`}
                >
                  {category.category}
                </h3>
                <p className={darkTheme ? 'text-lightGray' : 'text-gray-600'}>
                  {category.description}
                </p>
                <Link className="group" to="/all_classes">
                  <p className="text-skyBlue hover:text-green text-lg font-semibold mt-6 inline-flex items-center gap-3">
                    See More{' '}
                    <span className="text-xl">
                      <LuArrowUpRight />
                    </span>
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
