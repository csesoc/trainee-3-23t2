"use client"

export default function SignIn() {
    return (
    <>
    <link rel="stylesheet" href="login.css" />
    <img src="../rose.jpg" alt="Love Letters" id="rose" />
    <div id="right">
        <h1 id="title1">Love Letters</h1>
        <h1 id="title2">Login to Love Letters!</h1>
        <label>Username</label>
        <br />
        <input placeholder="Please enter your username!" />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input placeholder="Please enter your password!" />
        <br />
        <br />
        <button>Sign in</button>
        <br />
        <br />
        <a href="" id="forgo">
        Don't have an account? Register now!
        </a>
    </div>
    </>
    )
}