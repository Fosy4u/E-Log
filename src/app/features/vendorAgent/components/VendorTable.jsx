import { useEffect, useState } from "react";
import { Small } from "../../../components/Typography";
import EnhancedTable from "../../../utils/Table/EnhancedTable";
import ActionButtons from "./ActionButtons";
import VendorRemarks from "./VendorRemarks";

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
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "classification",
    numeric: false,
    disablePadding: false,
    label: "Classification",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "remarks",
    numeric: false,
    disablePadding: false,
    label: "Remarks",
  },
];

const VendorTable = ({ isLoading, allVendors }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [remarkVendor, setRemarkVendor] = useState();
  const [openModal, setOpenModal] = useState(false);

  const getRemarks = (remarks) => {
    return (
      <div>
        <Small
          className="text-danger text-decoration-underline"
          role="button"
          size="small"
          onClick={() => {
            setRemarkVendor(remarks);
            setOpenModal(true);
          }}
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
        key: { value: vendor._id, noFilter: true },
        contactName: {
          value: `${vendor?.salutation} ${vendor?.firstName} ${vendor?.lastName}`,
        },
        companyName: { value: vendor.companyName ? vendor.companyName : "N/P" },
        classification: { value: vendor.classification },
        phone: { value: vendor.phoneNo },
        remarks: {
          value: vendor?.remarks?.length > 0 ? getRemarks(vendor) : "N/P",
          noFilter: true,
        },
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
      {remarkVendor && (
        <VendorRemarks
          vendor={remarkVendor}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default VendorTable;
