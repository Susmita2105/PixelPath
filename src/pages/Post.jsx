
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serviceObject from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            serviceObject.getPost(slug).then((post) => {
                if (post){
                    // console.log("hi",slug)
                    setPost(post);
                } 
                else{
                    navigate("/");
                }
            });
        } 
        else 
            navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        serviceObject.deletePost(post.$id).then((status) => {
            if (status) {
                serviceObject.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (

        <div className="py-8">
            {/* <div className="py-2"> */}
                {isAuthor && (
                    <div className="absolute right-6 top-12">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            {/* </div> */}
            <Container>
                <div className="w-full flex justify-center relative rounded-xl p-2">
                    <img
                        src={serviceObject.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                
            </Container>
        </div>
    ) : null;
}
