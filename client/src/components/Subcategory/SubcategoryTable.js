import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Image } from "react-bootstrap";
import editicon from '../../assets/editicon.png';
import deleteicon from '../../assets/deleteicon.png';
import filterarrow from '../../assets/filterarrow.png';
import { Card, Modal } from "react-bootstrap";
import warningicon from '../../assets/warningicon.png';
import { Link } from "react-router-dom";
import axios from "axios";

const SubCategoryTable = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]); 
      const [categories, setCategories] = useState([]); 
    const [selectedRow, setSelectedRow] = useState(null); // Track selected row for delete confirmation
  const [deleteId, setDeleteId] = useState(null);
  const handleShow = (id) => {
    setDeleteId(id); // Set the category id to delete
    setShow(true);
  };
    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/subcategories"); // Update with your backend URL
                setData(response.data); // Update the table data
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchData();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: "Id", accessor: "_id" },
            { Header: "Sub Category Name", accessor: "subcategoryName" },
            { Header: "Category", accessor: "category.categoryName" }, // Access the nested category name
            { Header: "Image", accessor: "image", Cell: ({ value }) => <img src={`http://localhost:8000/${value}`} alt="subcategory" style={{ width: "50px", height: "50px" }} /> },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <span
                        style={{
                            padding: "5px 10px",
                            borderRadius: "12px",
                            color: value ? "green" : "red",
                        }}
                    >
                        {value ? "Active" : "Inactive"}
                    </span>
                ),
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <div style={styles.actionContainer}>
                        <Link to={`/subcategory/edit/${row.original._id}`}>
                            <Image src={editicon} />
                        </Link>
                        <Image src={deleteicon} onClick={() => handleShow(row.original._id)} />
                    </div>
                ),
            },
        ],
        []
    );

    // React Table hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const handleDelete = async () => {
      try {
          // Send DELETE request to backend
          const response = await axios.delete(`http://localhost:8000/api/subcategories/${deleteId}`);
          console.log(response.data);
          alert("SubCategory deleted successfully");
          setShow(false);
          // Filter the deleted subcategory from the data array
          setData(data.filter(subcategory => subcategory._id !== deleteId));
      } catch (error) {
          console.error("Error deleting subcategory:", error);
          alert("Failed to delete subcategory");
      }
  };

    return (
        <div style={styles.tableContainer}>
            <table {...getTableProps()} style={styles.table}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={styles.headerRow}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} style={styles.headerCell}>
                                    {column.render("Header")}
                                    <Image src={filterarrow} alt="Filter" style={styles.filterIcon} />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={styles.row}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} style={styles.cell}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <Card style={{ border: "none" }}>
                        <Card.Body>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "9px",
                              marginTop: "-10px",
                              position: "relative",
                            }}
                          >
                            <Image
                              style={{ width: "45px", height: "45px" }}
                              src={warningicon}
                            ></Image>
                            <Card.Title
                              style={{
                                marginTop: "20px",
                                fontFamily: "'Poppins'",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "22px",
                                lineHeight: "48px",
                                color: "#000000",
                              }}
                            >
                              Delete
                            </Card.Title>
                          </div>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              fontFamily: "'Poppins'",
                              fontStyle: "normal",
                              fontWeight: 400,
                              fontSize: "20px",
                              lineHeight: "36px",
                              color: "#8F8F8F",
                            }}
                          >
                            Are you sure you want to delete?
                          </Card.Text>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <button
                              style={{
                                borderRadius: "25px",
                                width: "159px",
                                height: "52px",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #9F9F9F",
                              }}
                              variant="outlined"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                            <button
                              style={{
                                borderRadius: "25px",
                                width: "159px",
                                height: "52px",
                                backgroundColor: "#662671",
                                border: "1px solid #9F9F9F",
                                color: "white",
                              }}
                              variant="outlined"
                              onClick={handleDelete}
                            >
                              Confirm
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Modal.Body>
                  </Modal>
        </div>
    );
};

const styles = {
    tableContainer: {
        width: "100%",
        padding: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "separate", // Ensure separation for spacing
        borderSpacing: "0 12px", // Adds spacing between rows (12px vertical spacing)
    },
    headerRow: {
        backgroundColor: "#FFF8B7", // Set header color to #FFF8B7
    },
    headerCell: {
        padding: "10px",
        fontFamily: "'Poppins'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "30px",
        color: "#000000", // Font color for header
        borderBottom: "2px solid #ddd",
        border:'none',
          height:'60px'
    },
    row: {
        height: "60px",
        backgroundColor: "#F2F2F2", 
       // Set row color to #F2F2F2
    },
    cell: {
        padding: "10px",
        fontFamily: "'Poppins'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "30px",
        color: "#000000", // Font color for row cells
        borderBottom: "1px solid #ddd",
         border:'none',
       
    },
    actionContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "10px",
    },
    filterIcon: {
        width: "13px", // Set width of the filter arrow
        height: "24px",
        position:'relative',
        left:'10px' // Set height of the filter arrow
    },
};

export default SubCategoryTable;
