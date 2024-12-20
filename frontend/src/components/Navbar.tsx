import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 px-[3%] md:px-[10%] py-3">
      <nav className=" bg-white/5 backdrop-blur-lg border border-gray-300 dark:border-white/5 shadow-lg rounded-2xl flex justify-between items-center px-[4%] md:px-[5%] py-5  dark:text-white">
        <div className="text-3xl font-bold tracking-tighter">Second Brain</div>
        <div>
          {/* <ToggleButton /> */}
          <ModeToggle/>
        </div>
      </nav>
    </div>
  );
};
