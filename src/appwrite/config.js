import conf from '../conf/conf'
import { Client, ID, Databases, Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;  //buckets and storage can be used interchangably

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        // console.log(featuredImage.type)
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //this will be considered as key
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log("Appwrite serive :: createPost :: error", error)
        }
    }

    // async updatePost(slug,{title, content, featuredImage, status}){
    //     console.log("up called here");
    //     try{
    //         return await this.databases.updateDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status
    //             }
    //         )
    //     }
    //     catch(error){
    //         console.log("Appwrite serive :: updatePost :: error", error)
    //     }
    // }
    async updatePost(id, {title, content, featuredImage, status}){
        // console.log("slug:",id);
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error){
            console.log("Appwrite serive :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug){
       try{
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
       }
       catch(error){
          console.log("Appwrite serive :: getPost :: error", error)
       }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch(error){
            console.log("Appwrite serive :: getPosts :: error", error)
            return false;
        }
    }

    // file upload services

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite serive :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        // console.log("file id",fileId)
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("Appwrite serive :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId){
        // console.log(fileId)
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const serviceObject = new Service();

export default serviceObject;