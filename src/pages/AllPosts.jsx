import React, { useState, useEffect } from 'react'
import { Container,PostCard } from '../components'
// import authServiceObject from '../appwrite/auth'
import serviceObject from '../appwrite/config'
import { Query } from 'appwrite'
import { useNavigate } from 'react-router-dom'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const userId = localStorage.getItem("userId")

        if(userId){
            serviceObject.getPosts([Query.equal('userId', userId)]).then((posts) => {
                // console.log("hi from all posts",posts.documents)
                if(posts){
                    setPosts(posts.documents)
                }
            }).catch((error) => {
                console.error("Error fetching posts:", error);
            });
        }
        else{
            console.error("User ID not found.");
        }

    },[])

    if(posts.length === 0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                You have no posts :(
                                    <br />
                                Try adding a new one🖼️
                            </h1>
                            <br />
                            <div>
                                <button
                                onClick={() =>{
                                    // console.log("clicked");
                                    navigate('/add-post')}
                                } 
                                className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-lg"
                                >
                                    Add Post
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className="grid grid-cols-4 gap-4">
                {posts.map((post) => (
                    <div key={post.$id} className=' relative aspect-w-1 aspect-h-1 bg-orange-50 rounded-xl'>
                        <div className='justify-center h-full bg-center place-content-center'>
                            <PostCard {...post}/>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
