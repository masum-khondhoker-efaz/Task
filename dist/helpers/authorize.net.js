"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargeCustomer = void 0;
const authorizenet_1 = require("authorizenet");
const config_1 = __importDefault(require("../config")); // Assuming config file contains your API credentials
const chargeCustomer = (paymentDetails, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const merchantAuthenticationType = new authorizenet_1.APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config_1.default.authorized.authorize_api_login_id);
    merchantAuthenticationType.setTransactionKey(config_1.default.authorized.authorize_transaction_key);
    const creditCard = new authorizenet_1.APIContracts.CreditCardType();
    creditCard.setCardNumber(paymentDetails.cardNumber);
    creditCard.setExpirationDate(paymentDetails.expiryDate);
    creditCard.setCardCode(paymentDetails.cvc);
    const paymentType = new authorizenet_1.APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);
    const transactionRequestType = new authorizenet_1.APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(authorizenet_1.APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);
    const createRequest = new authorizenet_1.APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);
    const ctrl = new authorizenet_1.APIControllers.CreateTransactionController(createRequest.getJSON());
    return new Promise((resolve, reject) => {
        ctrl.execute(() => {
            const apiResponse = ctrl.getResponse();
            const transactionResponse = apiResponse.getTransactionResponse();
            if (transactionResponse && transactionResponse.getMessages()) {
                console.log('Payment Successful:', transactionResponse.getMessages().getMessage()[0].getDescription());
                resolve({ success: true });
            }
            else {
                console.error('Payment Failed:', transactionResponse.getErrors()[0].getErrorText());
                resolve({ success: false, message: transactionResponse.getErrors()[0].getErrorText() });
            }
        });
    }).catch(error => {
        console.error('Error during payment processing:', error);
        return { success: false, message: error.message };
    });
});
exports.chargeCustomer = chargeCustomer;
