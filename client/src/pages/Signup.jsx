import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <main className=" bg-gray-100 h-[90vh]">
            <div className=" flex    items-center  w-[70%] h-[90%] mx-auto p-2 shadow-md rounded-lg mt-8 bg-white">
                <div className="w-[45%] h-[100%]">
                    <img
                        className="w-full h-[100%] object-cover rounded-md"
                        src="https://images.unsplash.com/photo-1517776832751-0a7e6993de03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZmZpdGl8ZW58MHx8MHx8fDA%3D"
                        alt=""
                    />
                </div>
                <div className="w-[55%] py-16 px-16">
                    <h2 className=" text-3xl font-semibold mb-4">Create an account</h2>
                    <p className='text-sm text-gray-500'>
                        Already have an account?
                        <Link className="text-blue-500 underline pl-2" to="/login">
                            Login
                        </Link>
                    </p>
                    <form className="flex flex-col gap-2 my-6">
                        <input type="text" placeholder='Full Name' className="border-transparent border-2 focus:border-blue-500 focus:border-2 focus:outline-none rounded-md px-2 py-1 bg-blue-50" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border-transparent border-2 focus:border-blue-500 focus:border-2 focus:outline-none rounded-md px-2 py-1 bg-blue-50"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-transparent border-2 focus:border-blue-500 focus:border-2 focus:outline-none rounded-md px-2 py-1 bg-blue-50"
                        />
                        <input
                            type="submit"
                            value={'Sign Up'}
                            className=" bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-600 transition-all duration-200 ease-in-out"
                        />
                    </form>
                    <div class="flex items-center">
                        <div class="flex-grow border-t border-gray-500"></div>
                        <span class="mx-4 text-gray-500 text-sm">Or register with</span>
                        <div class="flex-grow border-t border-gray-500"></div>
                    </div>
                    <div className="mt-4">
                        <button className="flex justify-center items-center gap-2 border-black border py-1 px-6 rounded-md w-full ">
                            <img
                                className="w-6 h-6"
                                src="https://cdn.icon-icons.com/icons2/729/PNG/96/google_icon-icons.com_62736.png"
                                alt=""
                            />
                            <p>Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signup