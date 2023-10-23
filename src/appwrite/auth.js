import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService {
    client = new Client();
    account;

    constructor() {
       this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appProjectId);
       this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        try{
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           if(userAccount) {
            await this.login( {email, password} );
           } else{
            return userAccount;
           }
        }catch(error) {
            throw new Error(error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw new Error(error);
        }
    }

    async logout() {
        try{
            return await this.account.deleteSessions();
        } catch(error) {
            throw new Error(error);
        }  
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        } catch(error) {
            console.log('user not found')
        }
    }
}

const authService = new AuthService();
export default authService;