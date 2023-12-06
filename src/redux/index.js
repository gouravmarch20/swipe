import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import bulkInvoicesReducer from "./bulkInvoicesSlice"; // Import your other reducers

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  bulkInvoices: bulkInvoicesReducer,
});

export default rootReducer;
