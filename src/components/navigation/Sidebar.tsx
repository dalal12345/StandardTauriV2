import { Link, useLocation } from "react-router-dom";
import { Home, Settings, Info, X, Minus, Maximize2, Moon, Sun, PanelLeftClose, PanelLeft, GripVertical } from "lucide-react";
import clsx from "clsx";
import { RouteList } from "@/constants/routes/RouteList";
import { useState, useEffect } from "react";
import useOsInfoStore from "@/store/OsInfoStore";
import useThemeStore from "@/store/ThemeStore";
import { useApplicationStore } from "@/store/ApplicationStore";
import { getCurrentWindow } from "@tauri-apps/api/window";

const routeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "": Home,
  "info": Info,
  "settings": Settings,
};

export default function Sidebar() {
  const [isCompact, setIsCompact] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean | null>(null);
  const location = useLocation();
  const isMobileOS = useOsInfoStore((state) => state.isMobileOS);
  const dark = useThemeStore((state) => state.dark);
  const setDark = useThemeStore((state) => state.setDark);
  
  const appName = useApplicationStore((state) => state.appName);
  const appVersion = useApplicationStore((state) => state.appVersion);
  const fetchAppInfo = useApplicationStore((state) => state.fetchAppInfo);

  useEffect(() => {
    if (!appName) {
      fetchAppInfo();
    }
  }, [appName, fetchAppInfo]);

  const startDraggingWindow = async () => {
    try {
      await getCurrentWindow().startDragging();
    } catch (e) {
      console.log(e);
    }
  };

  const handleWindowClose = async () => {
    try {
      await getCurrentWindow().close();
    } catch (e) {
      console.log(e);
    }
  };

  const hideWindow = async () => {
    try {
      await getCurrentWindow().minimize();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFullScreen = async () => {
    try {
      let screenStatus = await getCurrentWindow().isFullscreen();
      setIsFullScreen(screenStatus);
      if (isFullScreen) {
        await getCurrentWindow().setFullscreen(false);
        setIsFullScreen(false);
      } else {
        await getCurrentWindow().setFullscreen(true);
        setIsFullScreen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 h-screen bg-[#191f1f] dark:bg-zinc-900 border-r border-zinc-800 z-50 transition-all duration-300",
        "flex flex-col shadow-lg",
        {
          "w-64": !isCompact,
          "w-16": isCompact,
        }
      )}
    >
      {/* Header Section with Window Controls */}
      <div className={clsx("border-b border-zinc-800", {
        "p-2": isCompact,
        "p-3": !isCompact,
      })}>
        {/* Drag Area & Logo/Brand */}
        <div 
          className={clsx("flex items-center mb-3 cursor-move hover:bg-zinc-800/50 rounded-lg transition-colors", {
            "justify-center p-2": isCompact,
            "justify-between px-2 py-1": !isCompact,
          })}
          onMouseDown={startDraggingWindow}
          title="Drag to move window"
        >
          {/* Drag Handle Icon (Compact Mode) */}
          {isCompact && (
            <GripVertical size={18} className="text-zinc-500" />
          )}

          {/* Logo/Brand (Expanded Mode) */}
          {!isCompact && (
            <>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <GripVertical size={18} className="text-zinc-500 flex-shrink-0" />
                <h1 className={clsx(
                  "text-white font-bold truncate",
                  {
                    "text-lg": !appName || appName.length <= 15,
                    "text-base": appName && appName.length > 15 && appName.length <= 25,
                    "text-sm": appName && appName.length > 25,
                  }
                )}>
                  {appName || "HEROUI"}
                </h1>
              </div>
              
              {/* Compact Toggle in Expanded Mode */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCompact(!isCompact);
                }}
                className="p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors flex-shrink-0"
                title="Collapse Sidebar"
              >
                <PanelLeftClose size={18} />
              </button>
            </>
          )}
        </div>

        {/* Compact Toggle (Compact Mode Only) */}
        {isCompact && (
          <div className="flex justify-center mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCompact(!isCompact);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              title="Expand Sidebar"
            >
              <PanelLeft size={18} />
            </button>
          </div>
        )}

        {/* Window Controls (Desktop Only) */}
        {!isMobileOS && (
          <div className={clsx("flex gap-2", {
            "flex-col items-center": isCompact, // Vertical centered in compact mode
            "flex-row justify-center": !isCompact, // Horizontal in expanded mode
          })}>
            <button
              onClick={hideWindow}
              className={clsx("rounded-lg bg-zinc-800 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all flex items-center justify-center", {
                "w-10 h-10": isCompact,
                "p-2": !isCompact,
              })}
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={handleFullScreen}
              className={clsx("rounded-lg bg-zinc-800 text-green-500 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center", {
                "w-10 h-10": isCompact,
                "p-2": !isCompact,
              })}
              title="Maximize"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleWindowClose}
              className={clsx("rounded-lg bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center", {
                "w-10 h-10": isCompact,
                "p-2": !isCompact,
              })}
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
        {RouteList.map((route) => {
          const Icon = routeIcons[route.url] || Home;
          const isActive = location.pathname === `/${route.url}`;

          return (
            <Link
              key={route.url}
              to={`/${route.url}`}
              className={clsx(
                "flex items-center rounded-lg transition-all",
                "hover:bg-zinc-800 group relative",
                {
                  "bg-blue-600 text-white hover:bg-blue-700": isActive,
                  "text-zinc-400 hover:text-white": !isActive,
                  "justify-center w-10 h-10": isCompact,
                  "gap-3 px-3 py-3": !isCompact,
                }
              )}
              title={isCompact ? route.name : ""}
            >
              <Icon className="flex-shrink-0 w-5 h-5" />
              <span
                className={clsx("font-medium transition-all whitespace-nowrap overflow-hidden", {
                  "w-full opacity-100": !isCompact,
                  "w-0 opacity-0 hidden": isCompact,
                })}
              >
                {route.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section with Theme Toggle */}
      <div className="p-3 border-t border-zinc-800 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className={clsx(
            "flex items-center rounded-lg transition-all w-full",
            "bg-zinc-800 text-white hover:bg-zinc-700",
            {
              "justify-center h-10": isCompact,
              "gap-3 px-3 py-3": !isCompact,
            }
          )}
          title={isCompact ? (dark ? "Light Mode" : "Dark Mode") : ""}
        >
          {dark ? <Sun className="flex-shrink-0 w-5 h-5" /> : <Moon className="flex-shrink-0 w-5 h-5" />}
          <span
            className={clsx("font-medium transition-all whitespace-nowrap overflow-hidden", {
              "w-full opacity-100": !isCompact,
              "w-0 opacity-0 hidden": isCompact,
            })}
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Version */}
        <p
          className={clsx("text-xs text-zinc-500 text-center transition-all overflow-hidden", {
            "opacity-100 h-auto": !isCompact,
            "opacity-0 h-0": isCompact,
          })}
        >
          v{appVersion || "1.0.0"}
        </p>
      </div>
    </aside>
  );
}
