import React,{useState,useEffect} from 'react'
import { BiDotsVerticalRounded} from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { account,databases } from '../appwrite/AppwriteConfig';


const Home = () => {

const[employeeList,setEmployeeList]=useState([])
useEffect(()=>{
    const promise=databases.listDocuments("64ae4c5d32dcaa3dce06","64ae4c7248d525f062c3");

    promise
    .then(function(response){
        console.log(response);
        setEmployeeList(response.documents)
    })
    .catch(function(error){
        console.log(error);
    })

},[])


  return (
    <>
    <div className='w-100% min-h-screen flex flex-row ' >

        <div className='basis-1/4 m-2 p-2  border-r-2 border-black-100 '>
            {/* <div className=''> */}
                <h1 className='text-2xl font-bold'>Full Details</h1>
             
                    <img className='border-2 border-black rounded-full  w-60 h-60 mx-auto mt-8' src='https://picsum.photos/200/300' alt='lorem'/>
                
                <div className='details  mt-6'>
                    <h3 className='text-4xl py-1 ' >name</h3>
                    <h5 className='text-xl py-1 ' >email</h5>
                    <h5 className='text-xl py-1' >phone no</h5>
                    <h5 className='text-xl py-1'>designation</h5>
                    <h5 className='text-xl py-1'>date</h5>
                {/* </div> */}
            </div>
        </div>
        <div className='flex-grow   max-w-full mt-15' >
<div className='header bg-slate-100 text-left flex justify-between '>

<div className='py-3 ml-5' >
    <h1 className='text-xl py-4'>People</h1>
    
  <div className='flex'>
    <input
    type='text'
    placeholder='Search by name,designation etc'
    className='px-1 py-1  bg-gray-200 rounded-l'

    />
    <div className='flex items-center bg-gray-200 rounded-r'  >
   <AiOutlineSearch/>
   </div>
   </div>

  </div>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded h-9 mt-9">
  + Add Employee
</button>


  </div>



<div className='grid grid-cols-3 gap-1   '>
    {employeeList.map((employee,index)=>{
        return(

             <div className='mx-auto border-2  mt-10  w-60 h-80 shadow-2xl  rounded' key={employee.id}>
                                
            <div className='float-right'>
               <BiDotsVerticalRounded/>
                {/* <li> Edit</li>
                <li> Delete</li> */}
            
            </div>
            <div>
            <div className='image2'>
                                <img className='w-40 h-40 rounded-full mx-auto mt-2' src={employee.image} alt='lorememployee'/>
                            </div>
                            <div className='details2'>
                                <h4 className='text-2xl mt-5'>{employee.name}</h4>
                                <p className='font-light ' >{employee.email}</p>
                                <p className='py-5'>{employee.designation}</p>
                            </div>
  {/* <div className='image2'>
                                <img className='w-60 h-60 rounded-full' src='https://picsum.photos/200/300'alt='lorememployee'/>
                            </div>
                            <div className='details2'>
                                <h4 className='text-2xl mt-5'>name</h4>
                                <p className='font-light ' >email</p>
                                <p className='py-5'>desig</p>
                            </div> */}

            </div>
                </div>
        )

    })
    
    }

</div>
        </div>
    </div>
    
    </>
  )
}

export default Home


// import { Client, Databases } from "appwrite";

// const client = new Client();

// const databases = new Databases(client);

// client
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('5df5acd0d48c2') // Your project ID
// ;

// const promise = databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
