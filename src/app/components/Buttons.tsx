"use client"
import { motion } from 'framer-motion'
import React from 'react'

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
            <button className="buttonGoTo quiz">
                Quiz
            </button>
        </motion.div>
        <motion.div className="containerRight" variants={variantRight} initial="hidden" animate="visible">
            <p className="buttonMessage"> Create a poll </p>
            <button className="buttonGoTo poll">
                Poll
            </button>
        </motion.div>
    </div>
    )
}

export default Buttons
