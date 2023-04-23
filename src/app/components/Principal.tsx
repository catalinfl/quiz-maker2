"use client"
import React from 'react'
import Images from '../../../public/TEST.png'
import Image from 'next/image'
import { motion } from 'framer-motion'


export const Principal = () => {

    const variants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
    }

    return (
         <motion.div className="principal" variants={variants} initial="hidden" animate="visible" exit="hidden">
            <div className="principalMessage">
                <p className="msg">
                    Create a poll, a quiz, a survey.
                </p>
                <p className="msg second">
                    Fast.
                </p>
            </div>
            <div className="principalImg">
                <Image className="image" src={Images} alt="test"/>
            </div> 
         </motion.div>
    )

}

export default Principal
