import React, { useState } from "react";

import { databases } from "../appwrite/AppwriteConfig";

const AddEmployeePopUp = ({ addEmployee, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhonNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  //normal add method
  const handleSubmit = (e) => {
    e.preventDefault();

    addEmployee(name, image, designation, phoneno, email, date);
    setName("");
    setEmail("");
    setDesignation("");
    setPhonNo("");
    setImage("");
    setDate("");
    onClose();
  };

 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 ">
      <div className="bg-white p-8 rounded shadow text-start  w-96">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>

            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="employeename"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              email="email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              designation="designation"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              image="image"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneno"
            >
              Contact No
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pnoneno"
              type="text"
              value={phoneno}
              onChange={(e) => setPhonNo(e.target.value)}
              phoneno="phoneno"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date of Joining
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              date="date"
            />
          </div>
          <div className="flex justify-end ">
            <button
              className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePopUp;
