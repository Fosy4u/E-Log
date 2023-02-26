import CustomerCard from "./CustomerCard";

const CustomerList = ({ filteredData }) => {
  return (
    <div>
      <div
        style={{
          // height: "75vh",
          overflow: "scroll",
        }}
      >
        {filteredData?.map((customer) => (
          <div key={customer._id}>
            <CustomerCard customer={customer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
