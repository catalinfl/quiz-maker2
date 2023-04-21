import Link from "next/link";
import React from 'react'

export default function Navbar() {
  return (
        <div className="navbar">
            <div className="navbarLogo"> 
              <Link href="/" style={{ textDecoration: 'none' }}> 
              <p> FastSurvey </p>
              </Link>
            </div>
            <div className="navbarButtons">
              <Link href="/about"> 
              <button className="navAboutButton navButton">
                About
              </button>
              </Link>
              <Link href="/quiz"> 
              <button className="navQuizButton navButton">
                Quiz
              </button>
              </Link>
              <Link href="/poll"> 
              <button className="navPollButton navButton">
                Poll              
              </button>
              </Link>
            </div>
        </div>
    )
}

