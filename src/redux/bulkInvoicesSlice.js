import { createSlice } from "@reduxjs/toolkit"

const invoicesBulkSlice = createSlice({
  name: "bulkInvoices",
  initialState :[],

  reducers: {
    addBulkInvoice: (state, action) => {
      state.push(action.payload)
    },
    removeBulkInvoice: (state, action) => {
      return state.filter((bulkInvoices) => bulkInvoices.id !== action.payload)
    },
    clearAllBulkInvoice: (state, action) => {
      return  [] 
    },
  },
})

export const { addBulkInvoice, removeBulkInvoice, clearAllBulkInvoice } =
  invoicesBulkSlice.actions

export const selectedBulkInvoicesList = (state) => state.bulkInvoices

export default invoicesBulkSlice.reducer
