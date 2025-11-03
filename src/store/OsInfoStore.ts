import { create } from "zustand";
import { platform, version, arch, type, locale, hostname, family } from "@tauri-apps/plugin-os";
import { OsInfoState } from "@/interface/store/IOsInfoStore";

const useOsInfoStore = create<OsInfoState>((set, get) => ({
  osName: null,
  isMobileOS: false,
  platform: "",
  version: "",
  arch: "",
  type: "",
  locale: "",
  hostname: "",
  family: "",
  osFetched: false,
  
  setOSName: (os) => set({ osName: os }),
  setIsMobileOS: (status) => set({ isMobileOS: status }),
  setPlatform: (platformValue) => set({ platform: platformValue }),
  setVersion: (versionValue) => set({ version: versionValue }),
  setArch: (archValue) => set({ arch: archValue }),
  setType: (typeValue) => set({ type: typeValue }),
  setLocale: (localeValue) => set({ locale: localeValue }),
  setHostname: (hostnameValue) => set({ hostname: hostnameValue }),
  setFamily: (familyValue) => set({ family: familyValue }),
  setOsFetched: (status) => set({ osFetched: status }),
  
  detectMobileOS: () => {
    const osInfoStore = get();
    const setOsFetched = osInfoStore.setOsFetched;
    const currentOS = platform();
    set({ osName: currentOS, platform: currentOS });
    setOsFetched(true);

    if (currentOS === "android" || currentOS === "ios") {
      set({ isMobileOS: true });
    } else {
      set({ isMobileOS: false });
    }
  },
  
  fetchOsInfo: async () => {
    try {
      const platformName = platform();
      const osVersion = version();
      const osArch = arch();
      const osType = type();
      const osFamily = family();
      const osLocale = await locale();
      const osHostname = await hostname();

      console.log("OS Info Debug:", {
        platformName,
        osVersion,
        osArch,
        osType,
        osFamily,
        osLocale,
        osHostname,
      });

      set({
        platform: platformName || "Unknown",
        version: osVersion || "Unknown",
        arch: osArch || "Unknown",
        type: osType || "Unknown",
        locale: osLocale || "en-US",
        hostname: osHostname || "Unknown",
        family: osFamily || "Unknown",
        osName: platformName || "Unknown",
        osFetched: true,
      });
      
      // Also set mobile OS status
      if (platformName === "android" || platformName === "ios") {
        set({ isMobileOS: true });
      } else {
        set({ isMobileOS: false });
      }
    } catch (error) {
      console.error("Failed to fetch OS info:", error);
      // Set default values on error
      set({
        platform: "Unknown",
        version: "Unknown",
        arch: "Unknown",
        type: "Unknown",
        locale: "en-US",
        hostname: "Unknown",
        family: "Unknown",
        osFetched: true,
      });
    }
  },
}));

export default useOsInfoStore;
