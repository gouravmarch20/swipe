import React , {useEffect} from "react"
import EditableTable from "../components/EditableTable"
import { useDispatch } from "react-redux";
import { clearAllBulkInvoice } from "../redux/bulkInvoicesSlice";

const BulkInvoice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAllBulkInvoice())
    }
  }, [])

  return (
    <div className="">
      <EditableTable />
    </div>
  )
}

export default BulkInvoice
