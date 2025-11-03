import { useEffect } from "react";
import "./App.css";
import { useContextMenuStore } from "@/store/ContextMenuStore";
import useOsInfoStore from "./store/OsInfoStore";
import useThemeStore from "./store/ThemeStore";
import clsx from "clsx";
import Sidebar from "./components/navigation/Sidebar";
import { Outlet } from "react-router-dom";
import ContextMenuComponent from "./components/contextMenu/ContextMenuComponent";

function App() {
  const dark = useThemeStore((state) => state.dark);
  const setDark = useThemeStore((state) => state.setDark);
  const detectOS = useOsInfoStore((state) => state.detectMobileOS);
  const isMobileOS = useOsInfoStore((state) => state.isMobileOS);
  const osFetched = useOsInfoStore((state) => state.osFetched);
  const contextMenuVisible = useContextMenuStore(
    (state) => state.contextMenuVisible
  );
  const setContextMenuVisible = useContextMenuStore(
    (state) => state.setContextMenuVisible
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, [setDark]);

  useEffect(() => {
    if (!osFetched) {
      detectOS();
    }
  }, [osFetched]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenuVisible(!contextMenuVisible);
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, [contextMenuVisible]);

  return (
    <div
      className={clsx(
        "min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors select-none",
        {
          "custom-scrollbar": !isMobileOS,
        }
      )}
    >
      <Sidebar />
      
      {/* Main Content Area */}
      <main
        className={clsx(
          "transition-all duration-300 min-h-screen p-6",
          "ml-16" // Always leave space for sidebar (compact: 64px)
        )}
      >
        <Outlet />
      </main>
      
      <ContextMenuComponent />
    </div>
  );
}

export default App;
