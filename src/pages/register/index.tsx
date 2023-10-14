import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { CheckNim, Registration } from '../../types/user';
import { Form } from 'react-router-dom';
import axios from 'axios';
import passwordValidator from 'password-validator';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const schema = new passwordValidator();
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123'])

    const [form, setForm] = useState<Registration>({
        nim: 0,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // nim validation
    const [nimValidation, setNimValidation] = useState<CheckNim>({
        status: 0,
        message: "Masukan 10 angka"
    })
    const [colorNim, setColorNim] = useState<string>("tooltip-info")
    const [ringNim, setRingNim] = useState<string>("ring-indigo-600")
    const [loading, setLoading] = useState<boolean>(true)
    const [tooltip, setTooltip] = useState<boolean>(true)
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
                setRingNim("ring-green-400")
                setLoading(false)
                setTooltip(false)
                // console.log(response.data.status_code)

            })
            .catch((error) => {
                setColorNim("tooltip-error")
                setRingNim("ring-red-500")
                setTooltip(true)
                setLoading(false)
                setNimValidation({
                    status: error.response.data.status_code,
                    message: error.response.data.message
                })

            });
    }

    useEffect(() => {
        setLoading(true)
        let timer: ReturnType<typeof setTimeout>;

        if (loading) {
            setColorNim("tooltip-warning")
            setRingNim("ring-orange-300")
        }
        if (form.nim > 1000000000 && form.nim < 9999999999) {
            timer = setTimeout(() => {
                cekNim(form.nim)
                setTimeout(() => setTooltip(false), 6000)
            }, 3000)
        } else if (form.nim < 1000000000 || form.nim > 9999999999) {
            setColorNim("tooltip-info")
            setRingNim("ring-indigo-600")
            setNimValidation({
                status: 0,
                message: "masukan 10 angka"
            })
            setLoading(false)
            setTooltip(true)

        }


        return () => {
            clearTimeout(timer);

        }
    }, [form.nim])
    // end nim validation
    //email validation 
    const [emailValidation, setEmailValidation] = useState<CheckNim>({
        status: 0,
        message: "Masukan Email"
    })
    const [colorEmail, setColorEmail] = useState<string>("tooltip-info")
    const [ringEmail, setRingEmail] = useState<string>("ring-indigo-600")
    const [emailLoading, setEmailLoading] = useState<boolean>(true)
    const [tooltipEmail, setTooltipEmail] = useState<boolean>(true)
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const cekEmail = (n: string) => {
        const email: string = n

        // console.log(email)

        axios.post('http://127.0.0.1:3000/cekemail', { email })
            .then((response) => {
                setEmailValidation({
                    status: response.data.status_code,
                    message: response.data.message
                })
                setColorEmail("tooltip-success")
                setRingEmail("ring-green-400")
                setEmailLoading(false)
                setTooltipEmail(false)
                // console.log(response.data.status_code)

            })
            .catch((error) => {
                setColorEmail("tooltip-error")
                setRingEmail("ring-red-500")
                setTooltipEmail(true)
                setEmailLoading(false)
                setEmailValidation({
                    status: error.response.data.status_code,
                    message: error.response.data.message
                })

            });
    }

    useEffect(() => {
        setEmailLoading(true);
        let timer: ReturnType<typeof setTimeout>;

        if (emailLoading) {
            setColorEmail("tooltip-warning");
            setRingEmail("ring-orange-300");
        }

        // Memeriksa apakah email sesuai dengan pola regex
        if (/^[A-Za-z0-9._%+-]+@gmail+\.[a-z]{2,}$/.test(form.email)) {
            timer = setTimeout(() => {
                cekEmail(form.email);
            }, 3000);
        } else {
            setColorEmail("tooltip-info");
            setRingEmail("ring-indigo-600");
            setEmailValidation({
                status: 0,
                message: "Masukan Alamat Email yang valid"
            });
            setEmailLoading(false);
            setTooltipEmail(true);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [form.email]);


    //end email validation
    // password validator
    const [ringPassword, setRingPassword] = useState<string>("ring-indigo-600")
    const [tooltipPassword, setTooltipPassword] = useState<boolean>(false)
    const [colorPassword, setColorPassword] = useState<string>("tooltip-error")
    const [msgPassword, setMsgPassword] = useState<string>("Password terlalu lemah")
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        const testPassword: boolean | unknown[] = schema.validate(form.password, { list: true })
        if (form.password) {

            if (typeof testPassword !== "boolean") {
                if (testPassword.length === 0) {
                    console.log(testPassword)
                    setRingPassword("ring-green-500")
                    setMsgPassword("Good Job")
                    setTooltipPassword(true)
                    setColorPassword("tooltip-success")

                } else {
                    setRingPassword("ring-red-500")
                    setMsgPassword("Too weak")
                    setTooltipPassword(false)
                    setColorPassword("tooltip-error")

                }
            }
        }

    }, [form.password])


    //end password validator

    // start confirm password
    const [confirmPassword, setConfirmPassword] = useState<boolean>(false)
    useEffect(() => {
        if (form.confirmPassword !== "") {
            if (form.confirmPassword === form.password) {

                setConfirmPassword(true)
            }
        }
    }, [form.confirmPassword])
    //end confirm password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        if (emailValidation.status === 200) {
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
                            <div className={`  ${colorNim} mt-1 w-full  tooltip ${tooltip ? "tooltip-open" : ""}  tooltip-right  `} data-tip={loading ? "dicek dulu yaa...." : nimValidation.message}>
                                <input id="nim" name="nim" type="number" placeholder='Nim' required onChange={handleChange} className={`block px-2  w-full rounded-md   py-1.5 text-gray-900 shadow-sm ring-2 ring-inset outline-none placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 ${ringNim}`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-4 text-gray-900">Name</label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" placeholder='Name' onChange={handleChange} required className="block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-indigo-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">Email address</label>
                            <div className={`  ${colorEmail} mt-1 w-full  tooltip ${tooltipEmail ? "tooltip-open" : ""}  tooltip-right  `} data-tip={emailLoading ? "dicek dulu yaa...." : emailValidation.message}>
                                <input id="email" name="email" type="text" placeholder='Email' required onChange={handleChangeEmail} className={`block px-2  w-full rounded-md   py-1.5 text-gray-900 shadow-sm ring-2 ring-inset outline-none placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 ${ringEmail}`} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-900">Password</label>
                            <div className={`  ${colorPassword} mt-1 w-full  tooltip ${tooltipPassword ? "tooltip-open" : ""}  tooltip-right  `} data-tip={msgPassword}>
                                <input id="password" name="password" type="password" placeholder='Password' onChange={handlePassword} required className={`block px-2  w-full rounded-md   py-1.5 text-gray-900 shadow-sm ring-2 ring-inset outline-none placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 ${ringPassword}`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-4 text-gray-900">Confirm Password</label>
                            <div className="mt-1">
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder='Confirm Password' onChange={handleChange} required className={`block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${confirmPassword ? "ring-green-500" : "ring-indigo-600"} sm:text-sm sm:leading-6`} />
                            </div>
                        </div>

                        <div>
                            <button type={confirmPassword && tooltipPassword && nimValidation.status === 200 && emailValidation.status === 200 && form.name ? "submit" : "button"} className={`flex w-full justify-center rounded-md ${confirmPassword && tooltipPassword && nimValidation.status === 200 && emailValidation.status === 200 && form.name ? "bg-indigo-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "cursor-not-allowed bg-indigo-200"}  px-3 py-1.5 text-sm font-semibold leading-6 text-white `}>Register</button>
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