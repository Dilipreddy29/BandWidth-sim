
export enum SharingType {
  EQUAL = 'Equal Sharing',
  PRIORITY = 'Priority-Based',
  STATISTICAL = 'Statistical Multiplexing',
  TDM = 'Time-Division Multiplexing (TDM)',
  FDM = 'Frequency-Division Multiplexing (FDM)',
}

export interface Device {
  id: number;
  name: string;
  demand: number; // Bandwidth demand in Mbps
  allocated: number; // Allocated bandwidth in Mbps
  priority: number; // 1 is highest priority
}
