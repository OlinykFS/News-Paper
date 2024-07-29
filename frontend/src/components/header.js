import React from "react"

const Header = () => {
   return (
      <header className="fixed w-full h-10 bg-slate-400 ">
         <div>
            <nav>
               <ul className="flex align-middle justify-around ">
                  <li className="">Main</li>
                  <li>Post</li>
                  <li>Create new post</li>
               </ul>
            </nav>
         </div>
      </header>
   );
};
export default Header;