import React from "react";
import Arrow from "../../src/assets/images/arrow_right.svg";
import { Link } from "react-router-dom";
const NewTeachers = ({ id, name, date }) => {
  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold">{name}</p>
        <Link to={`/cuenta/docente/${id}`}>
          <img className="mt-3 cursor-pointer" src={Arrow} alt="nombre" />
        </Link>
      </div>

      <div className="flex  space-x-2 mt-1 mb-2 ">
        <p className="text-xs">Se unió el: </p>
        <p className="text-xs font-bold">{date}</p>
      </div>
      <hr className="bg-[#DBD8FF]" />
    </>
  );
};

export default NewTeachers;
