// Main metadata interface for application updates
export interface IMetadataStore {
  currentVersion: string;
  latestVersion: string;
  releaseDate: string;
  releaseUrl: string;
  author: string;
  severity: "low" | "medium" | "high" | "critical";
  platforms: string[];
  
  // New update information
  newFeatures: IFeature[];
  bugFixes: IBugFix[];
  breakingChanges: IBreakingChange[];
  notes: string;
  
  // Historical updates
  updateHistory: IVersionHistory[];
  
  // Download information
  downloadSize?: string;
  requiredDiskSpace?: string;
  estimatedDownloadTime?: string;
}

// Feature details for new updates
export interface IFeature {
  id: string;
  title: string;
  description: string;
  category: "ui" | "performance" | "feature" | "enhancement" | "security";
  priority: "low" | "medium" | "high";
  screenshots?: string[];
}

// Bug fix details
export interface IBugFix {
  id: string;
  title: string;
  description: string;
  severity: "minor" | "moderate" | "major" | "critical";
  affectedVersions: string[];
  issueUrl?: string;
}

// Breaking changes that require migration
export interface IBreakingChange {
  id: string;
  title: string;
  description: string;
  migrationGuide: string;
  affectedComponents: string[];
}

// Version history for changelog
export interface IVersionHistory {
  version: string;
  releaseDate: string;
  features: string[];
  bugFixes: string[];
  breakingChanges?: string[];
  downloadUrl: string;
  changelog: string;
  severity: "low" | "medium" | "high" | "critical";
}
