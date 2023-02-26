import useSettings from "../hooks/useSettings";
import MatxSuspense from "../utils/MatxSuspense";
import { MatxLayouts } from "./index";

const MatxLayout = (props) => {
  const { settings } = useSettings();
  
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;
