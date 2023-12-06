import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import {  updateInvoiceBulk } from "../redux/invoicesSlice"
import { useInvoiceListData, useSelectedBulkInvoiceData } from "../redux/hooks"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import {  useNavigate } from "react-router-dom";
import "./editable.css"

const EditableTable = () => {
  const dispatch = useDispatch()
  const { bulkInvoicesList, bulkInvoicesSize } = useSelectedBulkInvoiceData()
  const { invoiceList } = useInvoiceListData()
  const navigate = useNavigate();

  let temp = JSON.parse(JSON.stringify(invoiceList))
  let data = JSON.parse(JSON.stringify(bulkInvoicesList))

  const [invoiceData, setInvoiceData] = useState(data)
  const findAndReplaceById = (itemId, updateItem) => {
    const newData = [...temp]
    newData.forEach((invoice) => {
      let editData = invoice?.items.map((item) => {
        return item.itemId === itemId ? updateItem : item
      })
      invoice.items = editData
    })
  }
  const isValidData = () => {
    let isAllNameValid = true
    let isAllItemPrice = true
    let isAllItemQuantity = true

    invoiceData?.forEach((invoice) => {
      invoice?.items.forEach((item) => {
        if (item?.itemName?.length === 0) {
          isAllNameValid = false
        }



        if (isNaN(Number(item?.itemPrice))) {
          isAllItemPrice = false
        }
        if (isNaN(Number(item?.itemQuantity))) {
          isAllItemQuantity = false
        }
      })
    })

    if (isAllNameValid === false) {
      alert("invalid item name , it can not be empty")
    }
    if (isAllItemPrice === false) {
      alert("invalid item price , only Number allowed ")
    }
    if (isAllItemQuantity === false) {
      alert("invalid Item Quantity ,  only Number allowed ")
    }
    if (isAllNameValid && isAllItemPrice && isAllItemQuantity) return true
    return false
  }
  const handleUpdateInvoice = () => {
    if (!isValidData()) {
      return
    }
    invoiceData.forEach((invoice) => {
      invoice.items.forEach((item) => {
        findAndReplaceById(item.itemId, item)
      })
    })

    dispatch(updateInvoiceBulk(temp))

    alert("Invoices updated successfully 🥳")
    navigate("/");


  }
  const onChange = (e, itemId) => {
    const { name, value } = e.target

    const newData = [...invoiceData]
    newData?.forEach((invoice) => {
      let editData = []
      editData = invoice?.items.map((item) => {
        return item.itemId === itemId && name
          ? { ...item, [name]: value }
          : item
      })

      invoice.items = editData
    })

    setInvoiceData(newData)
  }

  return (
    <>
      {bulkInvoicesSize ? (
        <>
          <div className="d-flex align-items-center">
            <BiArrowBack size={18} />
            <div className="fw-bold mt-1 mx-2 cursor-pointer">
              <Link to="/">
                <h5>Go Back</h5>
              </Link>
            </div>
          </div>
          <div className="d-flex  justify-content-center  ">
            <h2 className="title">Only Product can updated</h2>
            <div
              style={{
                marginLeft: "28px",
              }}
            >
              <Button
                variant="primary mb-2 mb-md-4"
                onClick={() => handleUpdateInvoice()}
              >
                Save{" "}
              </Button>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr className="table-heading">
                <th
                  style={{
                    width: "80px",
                  }}
                >
                  Invoice Id{" "}
                </th>

                <th
                  style={{
                    width: "240px",
                  }}
                >
                  BillToEmail
                </th>
                <th
                  style={{
                    width: "240px",
                  }}
                >
                  billFromEmail
                </th>

                <th
                  style={{
                    width: "240px",
                  }}
                >
                  billToAddress
                </th>
                <th
                  style={{
                    width: "240px",
                  }}
                >
                  billFromAddress
                </th>

               

                <th>itemName</th>
                <th>itemDescription</th>
                <th>itemPrice</th>
                <th>itemQuantity</th>

                <th>taxAmount</th>
                <th>discountAmount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.map(
                ({
                  id,
                  currentDate,
                  invoiceNumber,
                  dateOfIssue,
                  billTo,
                  billToEmail,
                  billFromEmail,
                  billFromAddress,
                  billToAddress,
                  items,
                  taxAmount,
                  discountAmount,
                }) => (
                  <>
                    {items?.map(
                      ({
                        itemId,
                        itemName,
                        itemDescription,
                        itemPrice,
                        itemQuantity,
                      }) => (
                        <tr key={itemId} className="editableTable-row">
                          <td className="editableTable-row-center">{id}</td>
                          <td className="editableTable-row-center">
                            {billToEmail}
                          </td>
                          <td className="editableTable-row-center">
                            {billFromAddress}
                          </td>
                          <td className="editableTable-row-center">
                            {billToAddress}
                          </td>
                          <td className="editableTable-row-center">
                            {billFromEmail}
                          </td>

                          {/* step3 :: editable */}

                          <td>
                            <input
                              className="editableTable-input"
                              name="itemName"
                              value={itemName}
                              type="text"
                              onChange={(e) => onChange(e, itemId)}
                              placeholder="Type Name"
                            />
                          </td>
                          <td>
                            <input
                              className="editableTable-input"
                              name="itemDescription"
                              value={itemDescription}
                              type="text"
                              onChange={(e) => onChange(e, itemId)}
                              placeholder="Type Name"
                            />
                          </td>
                          <td>
                            <input
                              className="editableTable-input"
                              name="itemPrice"
                              value={itemPrice}
                              type="text"
                              onChange={(e) => onChange(e, itemId)}
                              placeholder="Type Name"
                            />
                          </td>
                          <td>
                            <input
                              className="editableTable-input"
                              name="itemQuantity"
                              value={itemQuantity}
                              type="text"
                              onChange={(e) => onChange(e, itemId)}
                              placeholder="Type Name"
                            />
                          </td>

                          {/* step2:: */}
                          <td className="editableTable-row-center">
                            {taxAmount}
                          </td>
                          <td className="editableTable-row-center">
                            {discountAmount}
                          </td>
                       

                        </tr>
                      )
                    )}
                    {/*  */}
                  </>
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <BiArrowBack size={18} />
            <div className="fw-bold mt-1 mx-2 cursor-pointer">
              <Link to="/">
                <h5>Go Back</h5>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center bg-black">
            <h3 className="fw-bold p-2   text-info d-flex align-content-center">
              No invoice selected to edit present
            </h3>
          </div>
        </>
      )}
    </>
  )
}

export default EditableTable
