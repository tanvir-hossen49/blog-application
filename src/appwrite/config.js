import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from '../conf/conf.js';

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, status, userId, featuredImage}) {
        try{
            return await this.databases.createDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug,
                { title, content, status, userId, featuredImage }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}) {
        try{
            return await this.databases.updateDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug,
                { title, content, status, featuredImage }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async deletePost(slug) {
        try{
            await this.databases.deleteDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug
            )
            return true;
        }catch(error) {
            throw new Error(error);
        }
    }
    
    async getPost(slug) {
        try{
            return await this.databases.getDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async getPosts(queries = [ Query.equal('status', 'active') ]) {
        try{
            return await this.databases.listDocuments(
                conf.appDatabaseId, conf.appwriteCollectionId, queries
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    // file services
    async uploadFile(file) {
        try{
            return await this.bucket.createFile(
                conf.appBucketId, ID.unique(), file
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async deleteFile(fileId) {
        try{
            await this.bucket.deleteFile(conf.appBucketId, fileId);
            return true;
        }catch(error) {
            throw new Error(error);
        }
    }

    getFilePreview(fileId) {
        try{
            return this.bucket.getFilePreview(
                conf.appBucketId, fileId
            );
        }catch(error) {
            throw new Error(error);
        }
    }
}

const service = new Service();
export default service;