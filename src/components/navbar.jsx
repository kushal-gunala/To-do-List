import React from "react";

const Navbar=()=>{
    return(
        <div>
            <nav className="flex justify-between bg-indigo-900 text-white py-2">
                <div className="logo">
                    <span className="font-bold text-xl mx-9">Taskly</span>
                </div>
                <ul className="flex gap-8 mx-9">
                    <li className="cursor-pointer hover:font-bold transition-all duration-[100ms] ease-linear">Home</li>
                    <li className="cursor-pointer hover:font-bold transition-all duration-[100ms] ease-linear">Your Tasks</li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar