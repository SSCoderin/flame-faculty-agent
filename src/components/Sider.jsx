export default function Sider() {
  const guideinfo = [
    { content: "Know about the faculty" },
    { content: "Explore faculty research papers" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center gap-3 border border-amber-400 rounded-xl px-4 py-3 bg-gray-800 shadow-md">
        <img src="/flame_logo.svg" alt="logo" className="w-12 h-12" />
        <div className="text-lg font-bold tracking-wide">Flame Faculty Agent</div>
      </div>

      <div className="flex flex-col w-full pt-10">
        <h2 className="text-base font-semibold text-amber-300 mb-3 uppercase tracking-wide">
          How to use
        </h2>
        <ul className="space-y-3">
          {guideinfo.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-3 border border-gray-700 bg-gray-800 rounded-lg hover:border-amber-400 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <span className="text-sm">{item.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}