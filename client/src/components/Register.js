import React, { useState } from 'react';
import "./mix.css";
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const [inpval, setInpVal] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [error, setError] = useState(""); // State for error messages

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpVal(() => {
            return {
                ...inpval,
                [name]: value
            };
        });
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        // Validation
        if (fname === "") {
            setError("Please enter your name.");
        } else if (email === "") {
            setError("Please enter an email.");
        } else if (!email.includes("@gmail.com") && !email.includes("@email.com")) {
            setError("Please enter a valid email.");
        } else if (password === "") {
            setError("Please enter a password.");
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters.");
        } else if (cpassword === "") {
            setError("Please enter a confirmation password.");
        } else if (cpassword.length < 6) {
            setError("Confirm password must be at least 6 characters.");
        } else if (password !== cpassword) {
            setError("Password and confirmation password do not match.");
        } else {
            setError(""); // Clear error if validation passes

            try {
                const data = await fetch("http://localhost:8009/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fname,
                        email,
                        password,
                        cpassword
                    })
                });

                const res = await data.json();

                if (res.status === 201) {
                    setInpVal({ fname: "", email: "", password: "", cpassword: "" });
                    setError("User registration successful."); // Success feedback
                } else {
                    setError(res.message || "Registration failed. Please try again.");
                }
            } catch (error) {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>
                            We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will like it.
                        </p>
                    </div>
                    <form>
                        {error && <div className="error_message">{error}</div>} {/* Display error messages */}
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input
                                type='text'
                                onChange={setVal}
                                value={inpval.fname}
                                name='fname'
                                id='fname'
                                placeholder='Enter Your Name'
                            />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                onChange={setVal}
                                value={inpval.email}
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Address'
                            />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input
                                    type={!passShow ? "password" : "text"}
                                    value={inpval.password}
                                    onChange={setVal}
                                    name='password'
                                    id='password'
                                    placeholder='Enter Your Password'
                                />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <div className='two'>
                                <input
                                    type={!cpassShow ? "password" : "text"}
                                    value={inpval.cpassword}
                                    onChange={setVal}
                                    name='cpassword'
                                    id='cpassword'
                                    placeholder='Enter Your Confirm Password'
                                />
                                <div className='showpass' onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>
                            Already have an account? <NavLink to='/'>Login In</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Register;
