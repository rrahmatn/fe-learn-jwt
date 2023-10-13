import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { CheckNim, Registration } from '../../types/user';
import { Form } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Registration>({
        nim: 0,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [nimValidation, setNimValidation] = useState<CheckNim>({
        status: 0,
        message: "Masukan 8 angka"
    })
    const [colorNim, setColorNim] = useState<string>("tooltip-info")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const cekNim = (n: number) => {

        const nim: number = Number(n)
        // console.log(nim)

        axios.post('http://127.0.0.1:3000/ceknim', { nim })
            .then((response) => {
                setNimValidation({
                    status: response.data.status_code,
                    message: response.data.message
                })
                setColorNim("tooltip-success")
                // console.log(response.data.status_code)

            })
            .catch((error) => {
                setColorNim("tooltip-error")
                setNimValidation({
                    status: error.response.data.status_code,
                    message: error.response.data.message
                })

            });
    }

    useEffect(() => {
        let timer: number;
        if (form.nim > 10000000) {
            timer = setTimeout(() => {
                cekNim(form.nim)
            }, 3000)
        }
        if (form.nim < 10000000) {
            setColorNim("tooltip-info")
            setNimValidation({
                status: 0,
                message: "masukan 8 angka"
            })
        }
        return () => clearTimeout(timer);
    }, [form.nim])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        if (nimValidation.status === 200) {
            await axios.post('http://127.0.0.1:3000/users', form)
                .then((response) => {
                    console.log('Data berhasil dikirim:', response.data);
                    navigate('/login')
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Error response status:', error.response.status);
                    } else if (error.request) {
                        console.error('No response received:', error.request);
                    } else {
                        console.error('Error:', error.message);
                    }
                });
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your new account</h2>
                </div>
                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">

                    {/* //form start */}

                    <Form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="nim" className="block text-sm font-medium leading-4 text-gray-900">Nim</label>
                            <div className={`  ${colorNim} mt-1 w-full tooltip tooltip-open tooltip-right `} data-tip={nimValidation.message}>
                                <input id="nim" name="nim" type="number" placeholder='Nim' required onChange={handleChange} className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-4 text-gray-900">Name</label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" placeholder='Name' onChange={handleChange} required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">Email address</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" placeholder='Email' required onChange={handleChange} className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-900">Password</label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" placeholder='Password' onChange={handleChange} required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-4 text-gray-900">Confirm Password</label>
                            <div className="mt-1">
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder='Confirm Password' onChange={handleChange} required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type={nimValidation.status === 200 ? "submit" : "button"} className={`flex w-full justify-center rounded-md ${nimValidation.status === 200 ? "bg-indigo-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "cursor-not-allowed bg-indigo-200"}  px-3 py-1.5 text-sm font-semibold leading-6 text-white `}>Register</button>
                        </div>
                    </Form>

                    {/* form end */}

                    <p className="mt-4 text-center text-sm  text-gray-500">
                        Have account?
                        <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 mx-2 hover:text-indigo-500">login here</NavLink>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register