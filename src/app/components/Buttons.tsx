"use client"
import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'

const Buttons = () =>  {
    const variantLeft = {
        hidden: {
            opacity: 0, x: -100
        },
        visible: {
            opacity: 1, x: 0
        }
    }

    const variantRight = {
        hidden: {
            opacity: 0, x: 100
        },
        visible: {
            opacity: 1, x: 0
        }
    }

    return (
    <div className="buttonsContainer">
        <motion.div className="containerLeft" variants={variantLeft} initial="hidden" animate="visible">
            <p className="buttonMessage"> Create a quiz </p>
            <Link href="/quiz">
            <button className="buttonGoTo quiz">
                Quiz
            </button>
            </Link>
        </motion.div>
        <motion.div className="containerRight" variants={variantRight} initial="hidden" animate="visible">
            <p className="buttonMessage"> Create a poll </p>
            <Link href="/poll"> 
            <button className="buttonGoTo poll">
                Poll
            </button>
            </Link>
        </motion.div>
    </div>
    )
}

export default Buttons
