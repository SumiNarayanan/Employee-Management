import React from "react";
import { useState } from "react";
import { databases } from "../appwrite/AppwriteConfig";
const EditEmployeePopUp = ({
  employee,
  onSave,
  onClose,
  setSelectedEmployeeIndex,
}) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneno, setPhonNo] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [image, setImage] = useState("");
  // const [dateOfJoining, setDateOfJoining] = useState("");
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [phoneno, setPhonNo] = useState(employee.phoneno);
  const [designation, setDesignation] = useState(employee.designation);
  const [image, setImage] = useState(employee.image);
  const [dateOfJoining, setDateOfJoining] = useState(employee.dateOfJoining);

  // const handleSave = (e) => {
  //   e.preventDefault();

  //   const updatedEmployee = {
  //     ...employee,
  //     name,
  //     email,
  //     phoneno,
  //     designation,
  //     image,
  //     dateOfJoining,
  //   };

  //   onSave(updatedEmployee);
  //   onClose();
  //   setSelectedEmployeeIndex(null)
  // };
  const handleSave = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      name,
      email,
      phoneno,
      designation,
      image,
      dateOfJoining,
    };
    console.log("Updating employee:", updatedEmployee);

    databases
      .updateDocument(
        "64ae4c5d32dcaa3dce06",
        "64ae4c7248d525f062c3",
        employee.$id,
        updatedEmployee
      )
      .then(() => {
        console.log("Employee updated successfully!");
        onSave(updatedEmployee);
        onClose();
        setSelectedEmployeeIndex(null);
      })
      .catch((error) => {
        console.log("Error updating employee:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 ">
      <div className="bg-white p-8 rounded shadow text-start  w-96">
        <h2 className="text-xl font-bold mb-4">Edit Employee Details</h2>
        <form onSubmit={handleSave}>
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
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfJoining"
            >
              Date of Joining
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateOfJoining"
              type="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
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

export default EditEmployeePopUp;
