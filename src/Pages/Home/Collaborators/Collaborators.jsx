import React from 'react';
import Container from '../../../components/Container/Container';

const partners = [
  {
    name: 'Programming Hero',
    logo: 'https://yt3.googleusercontent.com/PrG2FnV2yGOmoTXeXu6LDiaHgC9pSndBOORhGxBJnUWoRcKTuz0JGZYmGCA8OCUMkndvTdoJ3jU=s900-c-k-c0x00ffffff-no-rj',
    description: 'Leading in software development and innovation.',
  },
  {
    name: 'ProCoder BD',
    logo: 'https://yt3.googleusercontent.com/1YJ7bj1iGGLEYYg2q33N_4ENqdh6BmJ3CfwhJZIBaWWPQC-UDIvTrhZP6cioFYKBs003siie=s900-c-k-c0x00ffffff-no-rj',
    description: 'Promoting renewable energy solutions worldwide.',
  },
  {
    name: 'Learn With Sumit',
    logo: 'https://yt3.googleusercontent.com/XnrrHy6dKTuqZXKjwzodba-JuBffuXZN31C5LL9sTLG00I5M9qVX_vjRQCB7_hfZGyW9L2KCux0=s900-c-k-c0x00ffffff-no-rj',
    description: 'Committed to advancing global healthcare.',
  },
  {
    name: 'Hablu Programmer',
    logo: 'https://yt3.googleusercontent.com/9QMXXxihxY0Gw2F-yHWtfo5d83pgZMo6OGsKhlZyU86RYtJnO2nOluw19MO9Pw1cRiOH4Cv5oA=s900-c-k-c0x00ffffff-no-rj',
    description: 'Enhancing education through technology.',
  },
];

const Collaborators = () => {
  return (
    <div>
      <Container>
        <section className="pt-8 pb-10">
          <p className="text-darkGray text-center mb-6">
            We collaborate with industry leaders to bring innovation and
            excellence.
          </p>

          {/* Grid of Logos */}
          <div
            className="w-full overflow-x-auto scroll flex justify-evenly gap-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Partner Card */}
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-blueTrans min-w-48 max-w-48 rounded-lg p-6 flex flex-col items-center text-center"
              >
                {/* Partner Logo */}
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-24 h-24 mb-4 object-contain rounded-full"
                />
                {/* Partner Name */}
                <h3 className="text-lg font-medium text-nowrap">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Collaborators;
