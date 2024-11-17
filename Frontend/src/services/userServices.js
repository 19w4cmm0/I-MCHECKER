import {get, post, patch, del} from '../utils/request';

export const getUser = async () => {
    const result = await get('users');
    return result;
}
export const checkLogin = async (option) => {
    const result = await post(option, `api/auth/login`);
    return result;
}
export const postUser = async (option) => {
    const result = await post(option, 'users')
    return result;
}
export const postAccount = async (option) => {
    const result = await post(option, 'accounts')
    return result;
}
export const patchAccount = async (option, id) => {
    const result = await patch(`accounts/${id}`, option);
    return result;
}
export const delAccount = async (id) => {
    const result = await del(`accounts/${id}`);
    return result;
}