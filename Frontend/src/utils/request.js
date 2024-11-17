const API_DOMAIN = "http://localhost:5000/";

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        credentials: 'include'  // Thêm dòng này để gửi cookie
    });
    const result = await response.json();
    return result;
}

export const post = async (option, path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option),
        credentials: 'include'
    });
    const result = await response.json(); 
    return result;
}

export const patch = async (path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option),
        credentials: 'include'  // Thêm dòng này để gửi cookie
    });
    const result = await response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'DELETE',
        credentials: 'include'  // Thêm dòng này để gửi cookie
    });
    const result = await response.json();
    return result;
}
