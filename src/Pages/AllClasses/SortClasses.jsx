import React from 'react';

const SortClasses = ({ setSort }) => {
  return (
    <div className="mb-6 flex justify-end">
      <div className="flex items-center gap-4">
        <div className="group text-center cursor-pointer relative">
          <p className="bg-skyBlue text-slate-100 font-medium w-32 px-4 py-2 rounded-t-md rounded-b-md group-hover:rounded-b-none">
            Sort By Price
          </p>

          <ul className="bg-skyBlue text-white w-32 font-medium rounded-b-md hidden group-hover:block absolute top-9 right-0 z-10">
            <li
              onClick={() => setSort('default')}
              className="hover:bg-lightBlue text-nowrap px-4 py-1 transition-colors duration-200"
            >
              Default
            </li>
            <li
              onClick={() => setSort('low-high')}
              className="hover:bg-lightBlue text-nowrap px-4 py-1 transition-colors duration-200"
            >
              Low-High
            </li>
            <li
              onClick={() => setSort('high-low')}
              className="hover:bg-lightBlue text-nowrap px-4 pt-1 transition-colors duration-200 pb-3 rounded-b-lg"
            >
              High-Low
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortClasses;
