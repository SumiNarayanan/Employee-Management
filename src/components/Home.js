import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { databases } from "../appwrite/AppwriteConfig";
import AddEmployeePopUp from "./AddEmployeePopUp";
import EditEmployeePopUp from "./EditEmployeePopUp";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [employeeList, setEmployeeList] = useState([]); //list employee
  const [employeeDetails, setEmployeeDetails] = useState(null); //details on leftside
  const [showAddPopUp, setShowAddPopUp] = useState(false); //add popup
  const [showIconPopUp, setShowIconPopUp] = useState(false); //edit popup
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);
  const [searchText, setSearchText] = useState(""); //search

  //click add employee button
  const handleaddEmployee = () => {
    setShowAddPopUp(true);
  };

  //add New Empaloyee
  // const addEmployee = (name, image, designation, phoneno, email,date) => {
  //   const newEmployee = [
  //     ...employeeList,
  //     { name, image, designation, phoneno, email,date },
  //   ];
  //   setEmployeeList(newEmployee);
  // };

  const addEmployee = (name, image, designation, phoneno, email, date) => {
    console.log("Image URL:", image);
    const documentData = {
      name,
      image,
      designation,
      phoneno,
      email,
      date,
    };

    const databaseId = "64ae4c5d32dcaa3dce06";
    const collectionId = "64ae4c7248d525f062c3";
    const documentId = uuidv4(); // Generate a unique document ID using uuidv4()

    databases
      .createDocument(databaseId, collectionId, documentId, documentData)
      .then((response) => {
        const newEmployee = {
          $id: response.$id,
          ...documentData,
        };
        setEmployeeList([...employeeList, newEmployee]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //icon popup

  const handleIconpopup = (index) => {
    setSelectedEmployeeIndex(index);
  };

  //edit popup
  const handleEditPopUp = () => {
    setShowEditPopUp(true);
    setShowIconPopUp(false);
  };

  //Delete

  // const removeTask = (index) => {
  //   const newEmployee = [...employeeList];
  //   newEmployee.splice(index, 1);
  //   setEmployeeList(newEmployee);
  //   setSelectedEmployeeIndex(null);
  // };
  const removeTask = (index) => {
    const documentId = employeeList[index].$id;

    databases
      .deleteDocument(
        "64ae4c5d32dcaa3dce06",
        "64ae4c7248d525f062c3",
        documentId
      )
      .then(() => {
        const newEmployeeList = [...employeeList];
        newEmployeeList.splice(index, 1);
        setEmployeeList(newEmployeeList);
        setSelectedEmployeeIndex(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //save
  const handleSave = (updatedEmployee) => {
    setEmployeeList((prevList) => {
      const updatedList = [...prevList];
      updatedList[selectedEmployeeIndex] = {
        ...updatedList[selectedEmployeeIndex],
        ...updatedEmployee,
      };
      return updatedList;
    });
    if (
      !selectedEmployeeIndex ||
      selectedEmployeeIndex === updatedEmployee.$id
    ) {
      setEmployeeDetails(updatedEmployee);
    }

    // setEmployeeDetails(updatedEmployee); // Update the employee details state
    setShowEditPopUp(false);
    setSelectedEmployeeIndex(null);
  };

  useEffect(() => {
    const promise = databases.listDocuments(
      "64ae4c5d32dcaa3dce06",
      "64ae4c7248d525f062c3"
    );

    promise
      .then(function (response) {
        console.log(response);
        setEmployeeList(response.documents);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-row ">
        <div className="md:w-1/4 py-3 border-r-2 border-black-100  ">
          {/* <div className=''> */}
          {employeeDetails ? (
            <>
              <h1 className="text-2xl font-bold mt-10 ">Full Details</h1>

              <img
                className="border-2 border-black rounded-full  w-60 h-60 mx-auto mt-8"
                src={employeeDetails.image}
                alt="lorem"
              />

              <div className="details  mt-6">
                <h3 className="text-4xl py-1 ">{employeeDetails.name}</h3>
                <h5 className="text-xl py-1 ">{employeeDetails.email}</h5>
                <h5 className="text-xl py-1">{employeeDetails.phoneno}</h5>
                <h5 className="text-xl py-1">{employeeDetails.designation}</h5>
                <h5 className="text-xl py-1">{employeeDetails.date}</h5>
                {/* </div> */}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Full Details</h1>
              <h2 className="text-xl font-bold mt-40 ">
                Select employee to get Details...
              </h2>
            </>
          )}
        </div>
        <div className="flex-grow   max-w-full mt-15">
          <div className="header bg-slate-100 text-left flex justify-between ">
            <div className="py-3 ml-5">
              <h1 className="text-xl py-4">People {employeeList.length} </h1>

              <div className="flex relative ">
                <input
                  type="text"
                  placeholder="Search by name,email,designation etc"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="px-1 py-1  bg-gray-200 rounded-l w-96 border-none"
                />
                <div className="flex items-center bg-gray-200 rounded-r absolute right-2 top-2">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded h-9 mt-9"
              onClick={handleaddEmployee}
            >
              + Add Employee
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1   ">
            {/* {employeeList.map((employee,index ) => { */}
            {employeeList
              .filter(
                (employee) =>
                  employee.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  employee.email
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  employee.designation
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              )
              .map((employee, index) => {
                return (
                  <div
                    className="mx-auto  mt-10   px-6 border-1  rounded shadow-2xl  cursor-pointer transition ease-in-out  transform hover:scale-110 duration-700 shadow-black-100 "
                    key={employee.id}
                  >
                    <div className="float-right relative">
                      <BiDotsVerticalRounded
                        onClick={() => handleIconpopup(index)}
                      />

                      {/* <BiDotsVerticalRounded   onClick={() => handleIconpopup(employee)} /> */}
                      {/* {showIconPopUp && ( */}
                      {selectedEmployeeIndex === index && (
                        <ul className="list-none absolute text-sm text-start bg-gray-100 rounded right-1 border-none">
                          <li
                            className=" px-1 cursor-pointer hover:bg-gray-300 rounded"
                            onClick={handleEditPopUp}
                          >
                            Edit
                          </li>
                          <li
                            className=" px-1 cursor-pointer hover:bg-gray-300 rounded "
                            onClick={() => removeTask(index)}
                          >
                            Delete
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="text-xs rounded text-start list-none"></div>
                    <div>
                      <div className="image2">
                        <img
                          className="w-40 h-40 rounded-full mx-auto mt-2 "
                          src={employee.image}
                          alt="lorememployee"
                          onClick={() => setEmployeeDetails(employee)}
                        />
                      </div>
                      <div className="details2">
                        <h4 className="text-2xl mt-5">{employee.name}</h4>
                        <p className="font-light ">{employee.email}</p>
                        <p className="py-5">{employee.designation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {showAddPopUp && (
        <AddEmployeePopUp
          addEmployee={addEmployee}
          onClose={() => setShowAddPopUp(false)}
        />
      )}

      {showEditPopUp && (
        <EditEmployeePopUp
          employee={employeeList[selectedEmployeeIndex]} // Pass the selected employee data
          onSave={handleSave}
          onClose={() => setShowEditPopUp(false)}
          setSelectedEmployeeIndex={setSelectedEmployeeIndex}
        />
      )}
    </>
  );
};

export default Home;
