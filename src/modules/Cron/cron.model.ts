import mongoose from 'mongoose';
import { IUser } from './cron.interface';
const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    planStartDate: Date,
    planEndDate: Date,
    paymentDetails: {
      cardNumber: String,
      cvc: String,
      expiryDate: String,
    },
    lastPaymentStatus: String,
    lastPaymentDate: Date,
    paymentResponse: mongoose.Schema.Types.Mixed,
  }, { timestamps: true, versionKey: false });
  
  const User = mongoose.model<IUser>('users', userSchema);
  
  export default User;