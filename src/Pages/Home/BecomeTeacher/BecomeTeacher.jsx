import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container';

const BecomeTeacher = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="flex justify-center">
            <img
              className="max-h-96"
              src="https://static.vecteezy.com/system/resources/previews/023/254/079/non_2x/smiling-male-teacher-character-pointing-free-png.png"
              alt=""
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Become an Instructor</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
              sed fugit consequatur, obcaecati, laboriosam ea cumque minus ut
              ipsum dolorum iste mollitia magni? Est cupiditate corrupti
              pariatur commodi iusto. Minus, doloribus suscipit dolore iure
              magnam soluta atque voluptatibus! Ipsa veritatis temporibus eum
              corporis quisquam, voluptate reprehenderit ad nemo vel numquam.
            </p>
            <button onClick={() => navigate('/apply_teacher')} className="btn">
              Become an Instructor Today
            </button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default BecomeTeacher;
