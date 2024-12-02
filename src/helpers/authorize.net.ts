import { APIContracts, APIControllers } from "authorizenet";
import config from "../config";  // Assuming config file contains your API credentials

interface PaymentResult {
  success: boolean;
  message?: string;
}

export const chargeCustomer = async (paymentDetails: { cardNumber: string; cvc: string; expiryDate: string }, amount: number): Promise<PaymentResult> => {
  const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(config.authorized.authorize_api_login_id as string);
  merchantAuthenticationType.setTransactionKey(config.authorized.authorize_transaction_key as string);

  const creditCard = new APIContracts.CreditCardType();
  creditCard.setCardNumber(paymentDetails.cardNumber);
  creditCard.setExpirationDate(paymentDetails.expiryDate);
  creditCard.setCardCode(paymentDetails.cvc);

  const paymentType = new APIContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  const transactionRequestType = new APIContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(amount);

  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

  return new Promise<PaymentResult>((resolve, reject) => {
    ctrl.execute(() => {
      const apiResponse = ctrl.getResponse();
      const transactionResponse = apiResponse.getTransactionResponse();

      if (transactionResponse && transactionResponse.getMessages()) {
        console.log('Payment Successful:', transactionResponse.getMessages().getMessage()[0].getDescription());
        resolve({ success: true });
      } else {
        console.error('Payment Failed:', transactionResponse.getErrors()[0].getErrorText());
        resolve({ success: false, message: transactionResponse.getErrors()[0].getErrorText() });
      }
    });
  }).catch(error => {
    console.error('Error during payment processing:', error);
    return { success: false, message: error.message };
  });
};
