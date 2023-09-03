"use client"
import { signIn } from "next-auth/react"

export default function Register() {
    return (
        <>
        <link rel="stylesheet" href="register.css" />
        <img src="../rose.jpg" alt="Love Letters" id="rose" />
        <div id="right">
            <h1 id="title1">Love Letters</h1>
            <h1 id="title2">Register for Love Letters!</h1>
            <label>Username</label>
            <br />
            <input placeholder="Please choose a username!" required/>
            <br />
            <br />
            <label>Email</label>
            <br />
            <input placeholder="Please enter your email!" required/>
            <br />
            <br />
            <label>Password</label>
            <br />
            <input placeholder="Please enter a password!" required/>
            <br />
            <br />
            <label>Confirm Password</label>
            <br />
            <input placeholder="Please re-enter your password!" required/>
            <br />
            <br />
            <button onClick={() => signIn()}>Sign in</button>
            <br />
            <br />
            <a href="" id="forgo">
            Already have an account? Login now
            </a>
        </div>
        </>
    )
}