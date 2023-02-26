import PartnerCard from "./PartnerCard";

const PartnerList = ({ filteredData }) => {
  return (
    <div>
      <div
        style={{
          //height: "75vh",
          overflow: "scroll",
        }}
      >
        {filteredData?.map((partner) => (
          <div key={partner._id}>
            <PartnerCard partner={partner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerList;
