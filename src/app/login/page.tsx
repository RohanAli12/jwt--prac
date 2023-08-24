"use client"
import { useRouter } from "next/navigation";
import { useState } from 'react'

export default function Login() {
    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const handleChange = (event: any) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // const formData = new FormData(event.target);
        // const username = formData.get("username");
        // const password = formData.get("password");
        // console.log(username)
        // console.log(password)
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(form),
        });
        console.log(form)
        // console.log(object);
        const { accessToken } = await res.json();
        console.log(accessToken);
        if (accessToken) {
            // const nextUrl = searchParams.get('next')
            // @see: https://github.com/vercel/next.js/discussions/44149
            router.push("/");
        } else {
            // Make your shiny error handling with a great user experience
            alert("Login failed");
        }
    };
    return (
        <section className='flex justify-center items-center h-screen bg-gray-700'>
            <div className='bg-white p-8 rounded-lg shadow-2xl shadow-sky-600'>
                <h2 className='text-2xl font-semibold mb-4'>Login</h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium'>Username</label>
                        <input
                            type='text'
                            name="username"
                            onChange={handleChange}
                            className='w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium'>Password</label>
                        <input
                            type='password'
                            name="password"
                            onChange={handleChange}
                            className='w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
                    >
                        Log in
                    </button>
                </form>
            </div>
        </section>
    );
}
