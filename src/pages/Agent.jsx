import Sider from "../components/Sider";
import ChatPanel from "../components/ChatPanal";

export default function Agent() {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row text-white bg-gray-950">
      <div className=" md:flex md:w-1/5 h-full  justify-center p-10 bg-gray-900">
        <Sider />
      </div>

      <div className="flex flex-col flex-1 h-full items-center bg-black">
        <ChatPanel />
      </div>
    </div>
  );
}