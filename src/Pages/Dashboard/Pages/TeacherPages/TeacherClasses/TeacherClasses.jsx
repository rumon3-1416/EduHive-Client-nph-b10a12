import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import UpdateClass from './UpdateClass';
import Modal from '../../../../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SectionHeading from '../../../../Home/Shared/SectionHeading';

const TeacherClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 12;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const [delId, setDelId] = useState(null);
  const [updateModal, setUpdateModal] = useState({
    show: false,
    classData: {},
  });
  const [modal, setModal] = useState({
    show: false,
    res: '',
    title: '',
  });
  const { notify, darkTheme } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Load all Classes
  const { data: myClasses = [], refetch } = useQuery({
    queryKey: ['myClasses', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my_classes?page=${currentPage}&data=${dataPerPage}`
      );
      setTotalData(data.count);
      return data.teacherClasses;
    },
  });

  // Handle UpdateModal
  const handleUpdateModal = classData => {
    setUpdateModal({ show: true, classData });
  };
  // handle Update
  const handleUpdate = async updatedData => {
    const { data } = await axiosSecure.patch('/update_my_class', updatedData);
    data.acknowledged
      ? notify('success', 'Class Updated Successfully')
      : notify('error', 'Class Update Failed!');
    refetch();
    setUpdateModal({ show: false, classData: {} });
  };

  // Handle DeleteModal
  const HandleDeleteModal = id => {
    setDelId(id);
    setModal({ show: true, res: 'warn', title: 'Delete Class?' });
  };
  // handle Delete
  const handleDelete = async () => {
    const { data } = await axiosSecure.delete(`/delete_class/${delId}`);

    data.acknowledged &&
      (refetch(),
      notify('success', 'Class Deleted'),
      setModal({ show: false, res: '', title: '' }));
  };

  useEffect(() => {
    document.title = 'My Classes | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['My Classes']} />
      </div>

      <div>
        {/* Display Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {myClasses.map(classData => {
            const {
              _id,
              title,
              image,
              price,
              name,
              email,
              description,
              status,
              total_enrolment,
            } = classData;

            return (
              <div
                className={`${
                  darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
                } rounded-md shadow-lg flex flex-col items-start`}
                key={_id}
              >
                <div className="w-full p-3">
                  <img
                    className="w-full aspect-[4/3] object-cover rounded-md"
                    src={image}
                    alt={title}
                  />
                </div>

                <div className="px-6 pb-8 grow flex flex-col items-start">
                  <div className="grow">
                    <h4 className="text-lg font-semibold mb-3">{title}</h4>

                    <p className="flex flex-wrap">
                      <span className="font-medium">Total Enrolled -</span>
                      <span className="font-medium ms-2">
                        {total_enrolment}
                      </span>
                    </p>
                    <p className="flex flex-wrap">
                      <span className="font-medium">Price -</span>
                      <span className="font-medium ms-2">{price}</span>
                    </p>
                    <p className="flex flex-wrap">
                      <span className="font-medium">Status -</span>
                      <span className="font-medium ms-2">
                        {status?.charAt(0)?.toUpperCase() +
                          status?.slice(1) +
                          ''}
                      </span>
                    </p>
                    <p className="flex flex-wrap">
                      <span className="font-medium">Name -</span>
                      <span className="font-medium ms-2">{name}</span>
                    </p>
                    <p className="w-fit grid grid-cols-[1fr_auto] content-start">
                      <span className="font-medium text-nowrap">Email -</span>
                      <span className="font-medium text-left break-all ms-2">
                        {email}
                      </span>
                    </p>
                    <p className="mt-1 mb-3">{description}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateModal(classData)}
                      className="bg-green text-white hover:bg-hoverGreen text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => HandleDeleteModal(_id)}
                      className="bg-[#ff0000a3] text-white hover:bg-errorRed text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/teach_class_details/${_id}`)
                      }
                      className="bg-skyBlue text-white hover:bg-darkBlue font-medium px-3 py-1.5 rounded-md transition-all duration-200 text-sm"
                      disabled={status !== 'approved'}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-end items-center gap-4">
          <button
            onClick={() => {
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
            className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-[7px] rounded-md border-2 border-lightBlue hover:border-skyBlue"
          >
            <IoIosArrowBack />
          </button>
          {pagesArray.map(num => (
            <button
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded-md border-2 border-lightBlue ${
                currentPage === num + 1
                  ? 'bg-lightBlue text-white cursor-default'
                  : 'text-black hover:text-white bg-white hover:bg-skyBlue hover:border-skyBlue'
              }`}
              key={num}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => {
              currentPage < totalPages && setCurrentPage(currentPage + 1);
            }}
            className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-[7px] rounded-md border-2 border-lightBlue hover:border-skyBlue"
          >
            <IoIosArrowForward />
          </button>
        </div>

        {/* Update Modal */}
        {updateModal.show && (
          <UpdateClass
            classData={updateModal.classData}
            setUpdateModal={setUpdateModal}
            handleUpdate={handleUpdate}
          />
        )}

        {/* Delete Modal */}
        <Modal property={modal}>
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-[#ff3d3d] text-white text-lg font-medium px-6 py-2 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setModal({ ...modal, show: false });
                setDelId(null);
              }}
              className="bg-[#979797] text-white text-lg font-medium px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TeacherClasses;
