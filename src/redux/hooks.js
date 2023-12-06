import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectedBulkInvoicesList } from "./bulkInvoicesSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};
export const useSelectedBulkInvoiceData = () => {
  const bulkInvoicesList = useSelector(selectedBulkInvoicesList);
  const bulkInvoicesSize = bulkInvoicesList.length;

  return {
    bulkInvoicesList,
    bulkInvoicesSize,

  };
};
