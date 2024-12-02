export interface IUser {
    name: string;
    email: string;
    status: 'active' | 'inactive';
    planStartDate: Date;
    planEndDate: Date;
    paymentDetails: {
      cardNumber: string;
      cvc: string;
      expiryDate: string;
    };
    lastPaymentStatus?: string;
    lastPaymentDate?: Date;
    paymentResponse?: any;
  }