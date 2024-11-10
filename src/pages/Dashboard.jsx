import ButtonTile from "../ui/ButtonTile";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex gap-10 justify-around my-10">
        <ButtonTile color="pink">PLANS</ButtonTile>
        <ButtonTile>DRILLS</ButtonTile>
        <ButtonTile>CREATE PLAN</ButtonTile>
      </div>
    </div>
  );
}

export default Dashboard;
