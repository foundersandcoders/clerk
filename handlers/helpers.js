"use strict";

var paymentTypes =  {
    CHQ:   "cheque",
    CASH:  "cash",
    SOA:   "standing order payment advised (by member)",
    SOR:   "standing order received (and shown on bank statement)",
    BACSA: "BACS payment advised (by member)",
    BACSR: "BACS payment received by bank (and shown on bank statement)",
    CAFA:  "charities aid foundation payment advised by member",
    CAFR:  "charities aid foundation payment received by bank (shown on bank statement)",
    HO:    "payment received by Harbour Office along with harbour dues"
};

exports.validateTypes = Object.keys(paymentTypes);