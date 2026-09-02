import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            console.log(JSON.parse(sessionStorage.getItem('user')))
            return JSON.parse(sessionStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

export const authenticate = (data, next) => {
    if (window !== 'undefined') {
        // console.log('authenticate', response)
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
};

export const logout = next => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
};