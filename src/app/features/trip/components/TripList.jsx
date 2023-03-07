import TripCard from "./TripCard";
import TripTable from "./TripTable";

const TripList = ({ filteredData }) => {
  return (
    <div>
      <div
        style={{
          //height: "75vh",
          overflow: "scroll",
        }}
      >
        {/* {filteredData?.map((trip) => (
          <div key={trip._id}>
            <TripCard trip={trip} />
          </div>
        ))} */}
        {filteredData?.length > 0 && <TripTable allTrips={filteredData} />}
      </div>
    </div>
  );
};

export default TripList;
