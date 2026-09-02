import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getToken } from '../Utils/helpers'




const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();

    const updatePassword = async (formData) => {
        console.log(formData)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`

                }
            }

            const { data } = await axios.put(`${import.meta.env.VITE_API}/password/update`, formData, config)
            setIsUpdated(data.success)
            setLoading(false)
            toast.success('password updated', {
                position: 'bottom-right'
            });
            navigate('/me')


        } catch (error) {
            setError(error.response.data.message)

        }
    }

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: 'bottom-right'
            });
        }


    }, [error,])



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        updatePassword(formData)
    }

    return (
        <>
            <MetaData title={'Change Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword