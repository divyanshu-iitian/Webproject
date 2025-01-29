import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
function Footer(){
    const navigate = useNavigate();
    return (
        <div className="flex justify-around items-center p-2">
            <div onClick={()=>navigate("/")}>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <IoHomeOutline />
                </IconContext.Provider>
            </div>
            <div onClick={()=>navigate("/events")}>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <MdEvent />
                </IconContext.Provider>
            </div>
            <div onClick={()=>navigate("/events")}>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <CiCirclePlus />
                </IconContext.Provider>
            </div>
            <div onClick={()=>navigate("/shop")}>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <FaShoppingCart/>
                </IconContext.Provider>
            </div>
            <div>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <BiBell/>
                </IconContext.Provider>
            </div>
            <div onClick={()=>navigate("/profile")}>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <CgProfile />
                </IconContext.Provider>
            </div>
        </div>
    )
}
export default Footer