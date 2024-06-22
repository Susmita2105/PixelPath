import React, { useEffect, useState } from 'react'
import serviceObject from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        serviceObject.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    // console.log(posts.length);

    if(posts.length === 0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full ">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
                {/* <div className="flex flex-wrap ">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 '>
                            <div className='justify-center h-full bg-center place-content-center'>
                                <PostCard {...post}/>
                            </div>
                        </div>
                    ))}
                </div> */}
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

export default Home
