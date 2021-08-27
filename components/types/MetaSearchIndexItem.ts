export type MetaSearchIndexItem = {
  name: string;
  createdAt: string;
  updatedAt: string;
  entries: number;
  dataSize: number;
  fileSize: number;
  lastBuildTimeS: number;
  building: number;
  pendingTask: boolean;
};
