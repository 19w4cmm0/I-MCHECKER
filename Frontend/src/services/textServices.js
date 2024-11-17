import {get, post, patch, del} from '../utils/request';

export const getCart = async () => {
    const result = await get('cart');
    return result;
}
export const postText = async (option, type) => {
    const result = await post(option, `api/text/extract-keywords-entities`)
    return result;
}
export const patchCart = async (option, id) => {
    const result = await patch(`cart/${id}`, option);
    return result;
}
export const updateCartQuantity = async (productId, quantity) => {
    const result = await get(`cart/update/${productId}/${quantity}`);
    return result;
}
export const delCart = async (id) => {
    const result = await del(`cart/${id}`);
    return result;
}