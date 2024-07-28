export interface ClientDTO {
    id: number;  // Changed from 'queueNumber' to 'id'
    userId: string;  // New field
    positionInQueue: number;  // New field
    statusTypeId: number;  // Changed from 'status' enum to 'statusTypeId' number
    timeOfArrival: Date;  // Changed from 'joinedAt' to 'timeOfArrival'
    serviceTypeId: number;  // New field
    serviceTypeName: string;  // New field
    statusTypeName: string;  // New field
  }
  
  export enum QueueEntryStatus {
    Waiting = 1,
    Active = 2,
    Done = 3,
    Cancelled = 4,
  }
  
  export interface ServiceType {
    id: number;
    name: string;
  }