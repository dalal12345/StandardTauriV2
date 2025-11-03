export interface IRemoteDependency {
  id: string;
  name: string;
  version: IRemoteDependencyVersion;
  isOptional: boolean;
  isUpdateAvailable: boolean;
  updateLink: string;
  updateMessage: string;
}

export interface IRemoteDependencyVersion {
  online: string;
}

export interface IRemoteDependencyCollection {
  dependencies: IRemoteDependency[];
}

export interface IRuntimeDependencyVersion extends IRemoteDependencyVersion {
  current: string;
}

export interface IRuntimeDependency extends IRemoteDependency {
  version: IRuntimeDependencyVersion;
}

export interface IRuntimeDependencyCollection {
  dependencies: IRuntimeDependency[];
}
