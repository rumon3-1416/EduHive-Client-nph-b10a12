import React, { useState } from 'react';
import Container from '../../../components/Container/Container';

const QuesAns = () => {
  const [currTitle, setCurrTitle] = useState(0);

  return (
    <div className="bg-blueBg pt-16 pb-8">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,_3fr] items-center gap-16 md:gap-8 lg:gap-12 xl:gap-20">
          {/* Cards */}
          <div>
            <h1
              className={`poppins-font text-3xl leading-[44px] font-bold mb-2 text-dark4`}
            >
              Frequently Asked Questions
            </h1>
            <p className={`text-lg mb-10 text-[#32443f]`}>
              Ask any question what in your mind. Ask about anything about our
              marathons, upcoming marathons, adding marathon, editing marathon
              or anything else.
            </p>
          </div>

          {/* Frequent Ques */}
          <div>
            <div
              onClick={() => setCurrTitle(1)}
              className={`collapse collapse-arrow border mb-4 border-skyBlue rounded-xl ${
                currTitle !== 1 ? 'bg-blueBg' : ''
              }`}
            >
              <input type="radio" name="my-accordion-2" />
              <div
                className={`collapse-title ${
                  currTitle === 1 && 'text-dark-green'
                } text-xl font-medium`}
              >
                <p>How can I enroll in a class?</p>
              </div>
              <div className="collapse-content">
                <p>
                  To enroll in a class, browse our available courses and click
                  on the class you want to join. After reviewing the course
                  details, proceed to payment, and once completed, you’ll have
                  instant access to the class materials.
                </p>
              </div>
            </div>

            <div
              onClick={() => setCurrTitle(2)}
              className={`collapse collapse-arrow border mb-4 border-skyBlue rounded-xl ${
                currTitle !== 2 ? 'bg-blueBg' : ''
              }`}
            >
              <input type="radio" name="my-accordion-2" />
              <div
                className={`collapse-title ${
                  currTitle === 2 && 'text-dark-green'
                } text-xl font-medium`}
              >
                <p>Can I request to become a teacher on this platform?</p>
              </div>
              <div className="collapse-content">
                <p>
                  Yes! If you are passionate about teaching, you can apply to
                  become a teacher by submitting a request through your account
                  dashboard. Once your request is approved by our admin team,
                  you’ll be able to add and manage your courses.
                </p>
              </div>
            </div>

            <div
              onClick={() => setCurrTitle(3)}
              className={`collapse collapse-arrow border mb-4 border-skyBlue rounded-xl ${
                currTitle !== 3 ? 'bg-blueBg' : ''
              }`}
            >
              <input type="radio" name="my-accordion-2" />
              <div
                className={`collapse-title ${
                  currTitle === 3 && 'text-dark-green'
                } text-xl font-medium`}
              >
                <p>What payment methods are supported?</p>
              </div>
              <div className="collapse-content">
                <p>
                  We support a variety of secure payment options, including
                  credit/debit cards and online payment gateways like Stripe.
                  All transactions are encrypted to ensure your safety.
                </p>
              </div>
            </div>

            <div
              onClick={() => setCurrTitle(4)}
              className={`collapse collapse-arrow border mb-4 border-skyBlue rounded-xl ${
                currTitle !== 4 ? 'bg-blueBg' : ''
              }`}
            >
              <input type="radio" name="my-accordion-2" />
              <div
                className={`collapse-title ${
                  currTitle === 4 && 'text-dark-green'
                } text-xl font-medium`}
              >
                <p>How can I track my course progress?</p>
              </div>
              <div className="collapse-content">
                <p>
                  Once you enroll in a class, you can track your progress
                  through your personal dashboard. You will also be able to view
                  assignments, complete quizzes, and see your overall
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default QuesAns;
