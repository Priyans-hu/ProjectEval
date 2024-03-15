import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mt-4 animate-pulse">
                    Loading...
                </h2>
            </div>
        </div>
    )
}

export default Loader
