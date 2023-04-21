import React from 'react'
import Images from '../../../public/TEST.png'
import Image from 'next/image'
export const Principal = () => {
    return (
         <div className="principal">
            <div className="principalImg">
                <Image src={Images} alt="test"/>
            </div> 
         </div>
    )

}

export default Principal
