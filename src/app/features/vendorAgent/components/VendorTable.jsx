import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Small } from "../../../components/Typography";
import CollapsibleTable from "../../../utils/CollapsibleTable";
import DataTable from "../../../utils/DataTable";
import EnhancedTable from "../../../utils/Table/EnhancedTable";
import ActionButtons from "./ActionButtons";

// import StatusRowDisplay from "../../../features/productTag/component/StatusRowDisplay";
// import GetBranchName from "../../utils/GetBranchName";
// import RateDisplay from "./RateDisplay";

const headCells = [
  {
    id: "contactName",
    numeric: false,
    disablePadding: true,
    label: "Contact Name",
  },
  {
    id: "companyName",
    numeric: true,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "classification",
    numeric: true,
    disablePadding: false,
    label: "Classification",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "remarks",
    numeric: true,
    disablePadding: false,
    label: "Remarks",
  },
];

const VendorTable = ({ isLoading, allVendors }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  const getRemarks = (remarks) => {
    return (
      <div>
        <Small
          className="text-danger text-decoration-underline"
          role="button"
          size="small"
        >
          remarks
        </Small>
      </div>
    );
  };

  const getRowData = () => {
    const rows = [];
    allVendors.map((vendor) => {
      const row = {
        contactName: `${vendor?.salutation} ${vendor?.firstName} ${vendor?.lastName}`,
        companyName: vendor.companyName ? vendor.companyName : "N/P",
        classification: vendor.classification,
        phone: vendor.phoneNo,
        remarks:
          vendor?.remarks?.length > 0 ? getRemarks(vendor.remarks) : "N/P",
      };

      rows.push(row);
    });
    return rows;
  };

  useEffect(() => {
    if (selectedRow && allVendors) {
      const updatedSelectedRows = () => {
        return selectedRow.reduce((acc, curr) => {
          const item = allVendors.find((product) => product._id === curr);
          if (item) {
            acc.push(item);
          }

          return acc;
        }, []);
      };
      setSelectedVendors(updatedSelectedRows);
    }
  }, [selectedRow, allVendors, setSelectedVendors]);

  return (
    <div className="d-flex flex-column">
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <EnhancedTable
          title="Vendors"
          ActionButtons={ActionButtons}
          headCells={headCells}
          rows={getRowData()}
          stickyHeader
          filter
          styleRow
        />
      </div>
    </div>
  );
};

export default VendorTable;
