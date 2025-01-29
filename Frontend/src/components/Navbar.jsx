import leaderBoard from "/leaderboard.png"
import fire from "/fire.png"
import logo from "/logo.png"
function Navbar(){
    return (
        <div className="w-full h-full flex justify-around items-center">
            <div>
                <input type="text" placeholder="Search" className="px-3 p-2 w-5/6 rounded-full bg-neutral-900" />
            </div>
            <div>
                <img src={fire} alt="" className="h-9"/>
            </div>
            <div>
                <img src={leaderBoard} alt="" className="h-9"/>
            </div>
        </div>
    )
}
export default Navbar