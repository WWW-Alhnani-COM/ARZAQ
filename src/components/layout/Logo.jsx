import logo from "../../assets/logo.png";

export default function Logo({ light }) {
  return (
    <div className="flex items-center select-none">
      <img src={logo} alt="ARZAQ" className="w-9 h-9 object-contain" />
    </div>
  );
}
