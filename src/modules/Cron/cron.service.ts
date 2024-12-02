import cron from "node-cron";
import User from "./cron.model";
import { chargeCustomer } from "../../helpers/authorize.net";

export const processPaymentsService = async () => {
  console.log("Starting payment processing...");

  const users = await User.find({
    planEndDate: { $lt: new Date() },
    status: "active",
  });

  console.log(`Found ${users.length} users with expired plans.`);

  for (const user of users) {
    console.log(`Processing payment for user: ${user.email}`);
    try {
      const paymentResult = await chargeCustomer(user.paymentDetails, 97);
      const updateData = {
        lastPaymentStatus: paymentResult.success ? 'success' : 'failure',
        lastPaymentDate: new Date(),
        paymentResponse: paymentResult, // Store the entire payment result JSON
      };

      if (paymentResult.success) {
        console.log(`Payment successful for user: ${user.email}`);
      } else {
        console.log(`Payment failed for user: ${user.email}`);
      }

      await User.updateOne({ _id: user._id }, updateData);
      console.log(`Updated user ${user.email} with payment result.`);
    } catch (error) {
      console.error(`Error processing payment for user: ${user.email}`, error);
      const errorMessage = (error as Error).message;
      await User.updateOne({ _id: user._id }, {
        lastPaymentStatus: 'failure',
        lastPaymentDate: new Date(),
        paymentResponse: { error: errorMessage }, // Store the error message
      });
      console.log(`Updated user ${user.email} with error result.`);
    }
  }

  console.log("Finished payment processing.");
};

cron.schedule("0 0 * * *", processPaymentsService);