import commonAPI from "./commonAPI.JS";
import { serverURL } from "./serverURL";

// Review APIs
export const addReviewAPI = async (reviewData) => {
    try {
        return await commonAPI('POST', `${serverURL}/reviews`, reviewData);
    } catch (error) {
        console.error('Add Review API Error:', error);
        throw error;
    }
}

export const getReviewsByMobileAPI = async (mobileId) => {
    try {
        return await commonAPI('GET', `${serverURL}/reviews?mobileId=${mobileId}`, {});
    } catch (error) {
        console.error('Get Reviews API Error:', error);
        throw error;
    }
}

export const updateReviewAPI = async (id, reviewData) => {
    try {
        return await commonAPI('PUT', `${serverURL}/reviews/${id}`, reviewData);
    } catch (error) {
        console.error('Update Review API Error:', error);
        throw error;
    }
}

export const deleteReviewAPI = async (id) => {
    try {
        return await commonAPI('DELETE', `${serverURL}/reviews/${id}`, {});
    } catch (error) {
        console.error('Delete Review API Error:', error);
        throw error;
    }
}

export const getAllReviewsAPI = async () => {
    try {
        return await commonAPI('GET', `${serverURL}/reviews`, {});
    } catch (error) {
        console.error('Get All Reviews API Error:', error);
        throw error;
    }
}

// Keep all your existing mobile and wishlist APIs...
export const addMobileAPI = async (mobileData) => {
    try {
        return await commonAPI('POST', `${serverURL}/mobiles`, mobileData);
    } catch (error) {
        console.error('Add Mobile API Error:', error);
        throw error;
    }
}

export const getAllMobilesAPI = async () => {
    try {
        return await commonAPI('GET', `${serverURL}/mobiles`, {});
    } catch (error) {
        console.error('Get All Mobiles API Error:', error);
        throw error;
    }
}

export const updateMobileAPI = async (id, editData) => {
    try {
        return await commonAPI('PUT', `${serverURL}/mobiles/${id}`, editData);
    } catch (error) {
        console.error('Update Mobile API Error:', error);
        throw error;
    }
}

export const deleteMobileAPI = async (id) => {
    try {
        return await commonAPI('DELETE', `${serverURL}/mobiles/${id}`, {});
    } catch (error) {
        console.error('Delete Mobile API Error:', error);
        throw error;
    }
}

export const addToWishlistAPI = async (wishlistItem) => {
    try {
        return await commonAPI('POST', `${serverURL}/wishlist`, wishlistItem);
    } catch (error) {
        console.error('Add to Wishlist API Error:', error);
        throw error;
    }
}

export const getWishlistAPI = async () => {
    try {
        return await commonAPI('GET', `${serverURL}/wishlist`, {});
    } catch (error) {
        console.error('Get Wishlist API Error:', error);
        throw error;
    }
}

export const removeFromWishlistAPI = async (id) => {
    try {
        return await commonAPI('DELETE', `${serverURL}/wishlist/${id}`, {});
    } catch (error) {
        console.error('Remove from Wishlist API Error:', error);
        throw error;
    }
}

export const checkServerStatusAPI = async () => {
    try {
        const response = await commonAPI('GET', `${serverURL}/mobiles`, {});
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}