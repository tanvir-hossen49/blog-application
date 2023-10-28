import { login, logout } from "../store/authSlice";
import config from '../appwrite/config';

export const isAuthor = async (userData, dispatch) => {
    try {
        if (userData) {
            const author = await config.getAuthor(userData?.$id);

            if (author) {
                const { isVerified, image, facebookLink, linkedinLink, role, bio, gender } = author;
                dispatch(login({ ...userData, isVerified, image, facebookLink, linkedinLink, gender, role, bio }));
            } else {
                dispatch(login(userData));
            }
        } else {
            dispatch(logout());
        }
    } catch (error) {
        dispatch(logout());
        console.log('Error fetching user data:', error);
    }
};