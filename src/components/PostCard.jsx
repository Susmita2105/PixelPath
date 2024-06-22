import React from 'react'
// import appwriteService from '../appwrite/config'
import serviceObject from '../appwrite/config'
import { Link } from 'react-router-dom'

// $id is the syntax of appwrite, which means the name of this variable is $id
function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl p-4 text-black'>

            <div className='w-full mb-4 '>
              <div className="bg-center w-3/4 justify-center m-auto">
                  <img src={serviceObject.getFilePreview(featuredImage)} alt={title} 
                  className='rounded-xl bg-center'
                  />
              </div>
            </div>
            <h2 className='text-xl font-bold '>{title}</h2>
          
        </div>
    </Link>
  )
}

export default PostCard
