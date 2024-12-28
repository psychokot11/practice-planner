import { NavLink } from "react-router-dom";
import ButtonTile from "../ui/ButtonTile";
import { FcPlanner, FcIdea, FcAddDatabase } from "react-icons/fc";


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex gap-10 justify-around my-10">
        <NavLink to="/plans"><ButtonTile><FcPlanner className="size-10" /> PLANS</ButtonTile></NavLink>
        <NavLink to="/drills"><ButtonTile><FcIdea  className="size-10" /> DRILLS</ButtonTile></NavLink>
        <ButtonTile><FcAddDatabase  className="size-10" /> CREATE PLAN</ButtonTile>
      </div>
    </div>
  );
}

export default Dashboard;
