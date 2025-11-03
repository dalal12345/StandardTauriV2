import { IRuntimeUpdateState } from "../metadata/UpdateInterface";

export interface IApplicationState {
  updateMetadata: IRuntimeUpdateState | null;
  isCheckingUpdate: boolean;
  updateCheckError: string | null;
  lastUpdateCheck: Date | null;

  checkForUpdates: () => Promise<void>;
  setUpdateMetadata: (metadata: IRuntimeUpdateState | null) => void;
  setIsCheckingUpdate: (status: boolean) => void;
  setUpdateCheckError: (error: string | null) => void;
  clearUpdateData: () => void;
}
