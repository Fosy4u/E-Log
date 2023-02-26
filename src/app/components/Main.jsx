import { topMenuBarHeight } from "../utils/constant";
import MatxSearchBox from "../utils/MatxSearchBox";
import { H3 } from "./Typography";

const Main = ({
  children,
  className,
  Icon,
  CustomButtons,
  title,
  showSearchBox,
  placeholder,
  setInput,
}) => {
  return (
    <div style={{ height: topMenuBarHeight }}>
      <div
        className="w-100 bg-secondaryBrandColor  p-2 d-flex justify-content-between"
        style={{ height: topMenuBarHeight }}
      >
        <div className={`d-flex align-items-center text-white ${className}`}>
          {Icon && <Icon className={` fa-2x me-3 `} cursor="pointer" />}
          <H3 className={``}>{title}</H3>
        </div>
        <div className="d-flex ">
          {showSearchBox && (
            <span className="me-2">
              <MatxSearchBox placeholder={placeholder} setInput={setInput} />
            </span>
          )}
          {CustomButtons && <div>{<CustomButtons />}</div>}
        </div>
      </div>
      <div
        style={{
          height: "85vh",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Main;
