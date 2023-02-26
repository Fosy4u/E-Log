import useSettings from "../hooks/useSettings";
import Logo from "../../app/images/Logo1.png";

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img
      width="24px"
      height="24px"
      className={className}
      src={Logo}
      alt="e-log logo"
    />
  );
};

export default MatxLogo;
