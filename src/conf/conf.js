const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_BLOG_COLLECTION_ID),
    appwriteAuthorCollectionId: String(import.meta.env.VITE_APPWRITE_AUTHOR_COLLECTION_ID),
    appwriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;