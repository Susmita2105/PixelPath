import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account =  new Account(this.client)
    }

    async createAccount({email,password,name}){
        // console.log("hello from createAcc")
        try{
           const userAccount = await this.account.create(ID.unique(),email,password,name)

           if(userAccount){
            // call another function
            return this.login({email,password})
           }
           else{
            return userAccount;
           }
        }
        catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession( email,password)
        }
        catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("Appwrite serive :: getCurrentUser :: error", error)
        }
        return null;
    }

    async logout(){
        try{
            // await this.account.deleteSession('current')
            await this.account.deleteSessions()
            localStorage.clear()
            // console.log("out")
            location.reload();
            // this will delete all
        }
        catch(error){
            console.log("Appwrite serive :: logout :: error", error)   
        }
    }
}



const authServiceObject = new AuthService();
// instead of exporting the class, we can simply return an object after creating it

export default authServiceObject