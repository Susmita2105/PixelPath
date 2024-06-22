import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
import serviceObject from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../store/authSlice";

export default function PostForm({post}) {
    // console.log("first", post)

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?. title || '',
            slug: post?. slug || '',
            content: post?. content || '',
            status: post?. status || 'active'
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    // console.log("new here",userData.$id)

    const submit = async(data) =>{
        // console.log(data.image[0].type )
        // console.log(data.slug);
        // console.log(post.$id);
        if(post){
            // console.log("entered update", post);
            // console.log("id :: ",post.$id);
            const file = data.image[0] ? await serviceObject.uploadFile(data.image[0]) : null

            if(file && post.featuredImage){
                // console.log("file",file)
                // console.log("post",post)
                serviceObject.deleteFile(post.featuredImage)
            }
            
            const dbPost = await serviceObject.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            // const dbPost = await serviceObject.updatePost(post.slug, updatedData);
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = await serviceObject.uploadFile(data.image[0])
            if(file){
                const filedId = file.$id;
                data.featuredImage = filedId;
                const dbPost = await serviceObject.createPost({
                    ...data,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // this is to convert any space or spcl character in title into -
    const slugTransform = useCallback((value) =>{
        if(value && typeof(value) === 'string'){
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-")

                    // ^ => do not include
                    // \d => digit
                    // \s =>space 

            // //easy way
            // const slug = value.toLowerCase().replace(/ /g,'-')
            // // g  represents the global flag, which means all occurrences of the space character will be replaced, not just the first one & / / represents space
            // setValue('slug', slug)
            // return slug;
        }
        return ""
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title,
                {shouldValidate:true}))
            }
        })
        
        return () =>{
            subscription.unsubscribe()
        }

    },[watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-xl">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", {
                     required: true
                    }
                )}
            />

            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {
                     required: true 
                    }
                )}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />

            <RTE 
            label="Content :" 
            name="content" 
            control={control} 
            defaultValue={getValues("content")} 
            />
        </div>

        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                     required: !post 
                    }
                )}
            />

            {post && post.featuredImage && (
                <div className="w-full mb-4">
                    <img
                        src={serviceObject.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}

            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { 
                    required: true 
                    }
                )}
            />

            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>

        </div>
    </form>
  )
}

