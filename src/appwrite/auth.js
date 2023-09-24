import { Client, Account, ID } from "appwrite";
import config from '../config/config.js'

export class AuthService {
    client = new Client();
    account;

    constructor() {
       this.client.setEndpoint(config.appwriteUrl).setProject(config.appProjectId);
       this.account = new Account(this.client);
    }

    async createAccount( {email, password, name} ) {
        try{
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           if(userAccount) {
            this.login(email, password)
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
            throw new Error(error);
        }
    }
}

const authService = new AuthService();
export default authService;