export interface IApplicationState {
  name: string;
  onlineVersion: string;
  currentVersion: string;
  updateAvailable: boolean;
  updateMessage?: string;
  updateUrl?: string;
}
