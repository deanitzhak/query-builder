// Define your data structure interfaces here

export interface BaseObject {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Add more specific data object interfaces as needed
  export interface User extends BaseObject {
    name: string;
    email: string;
  }
  
  export interface HeaderTitleProps{
    title: string;
    subtitle?: string;
    className?: string;
  }