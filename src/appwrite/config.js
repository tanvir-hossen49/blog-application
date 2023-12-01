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

    async createPost({ title, slug, content, status, userId, featuredImg, author }) {
        try{
            return await this.databases.createDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug,
                { title, content, status, userId, featuredImg, author }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async createAuthor({ name, email, userId, image, facebookLink, linkedinLink, gender, bio }) {
        try{
            return await this.databases.createDocument(
                conf.appDatabaseId, conf.appwriteAuthorCollectionId, userId,
                { name, email, image, facebookLink, linkedinLink, gender, bio }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async getAuthors() {
        try{
            const response = await this.databases.listDocuments(
                conf.appDatabaseId, conf.appwriteAuthorCollectionId
            );
            return response.documents
        }catch(error) {
            console.log('get authors :: error ::', error)
        }
    }

    async getAuthor(userId) {
        try{
            return await this.databases.getDocument(
                conf.appDatabaseId, conf.appwriteAuthorCollectionId, userId
            );
        }catch(error) {
            console.log('get author :: error ::', 'author not found')
        }
    }

    async updatePost(slug, { title, content, status, featuredImg}) {
        try{
            return await this.databases.updateDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug,
                { title, content, status, featuredImg }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async updateLike(slug, likes, likedBy ) {
        try{
            await this.databases.updateDocument(
                conf.appDatabaseId, conf.appwriteCollectionId, slug,
                { 
                    likes,
                    likedBy,
                }
            );

            return true;
        }catch(error) {
            throw new Error(error);
        }
    }

    async createComment({ slug, commenterId, comment, commenterName, commenterImage }) {
        try{
            return await this.databases.createDocument(
                conf.appDatabaseId, conf.appwriteCommentCollectionId, ID.unique(),
                { commenterId, comment, commenterName, blogId: slug, commenterImage }
            );
        }catch(error) {
            throw new Error(error);
        }
    }

    async getComment( blogId ) {
        try{
            return await this.databases.listDocuments(
                conf.appDatabaseId, conf.appwriteCommentCollectionId, [ Query.equal('blogId', blogId)] ,
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
            // throw new Error(error);
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

    async getSearchedPosts(searchedText) {
        try {
            const response = await this.databases.listDocuments(
                conf.appDatabaseId, conf.appwriteCollectionId, 
                [ Query.search('title', searchedText) ]
            );
        
            return response;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
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