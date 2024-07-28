import React from 'react'
import User from './User'
import usegetallUser from '../../context/usegetallUser'

const Users = () => {
  const[allUsers,loading]= usegetallUser();
  console.log(allUsers)
  return (
    <div >
      <h1 className=' px-8 py-2 mt-5  text-white font-semibold bg-slate-800 rounded-md'>Massages</h1>

      <div className='  py-2  overflow-y-auto '  
       style={{maxHeight:"calc(84vh - 10vh)" }} >


        {allUsers.map((user,index)=>(
          <User key={index} user={user}/>

        ))}
      

      </div>


    </div>
  )
}

export default Users
