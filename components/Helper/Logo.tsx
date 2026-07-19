import Image from 'next/image';
import React from 'react';

// import { FaTasks } from 'react-icons/fa';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-col">
                <FaTasks className='w-5 h-5 text-white'/>
            </div> */}
            <Image
                src={"/images/logo.png"}
                alt="img"
                width={60}
                height={60}
                
            />
            <h1 className="text-xl sm:block md:text-1xl text-gray-800">TajwidQu</h1>
        </div>
    );
};

export default Logo;