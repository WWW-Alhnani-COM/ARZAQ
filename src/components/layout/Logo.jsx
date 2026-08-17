import logo from "../../assets/logo.png";

export default function Logo({ light }) {
  return (
    <div className="flex items-center select-none">
      <img
        src={logo}
        alt="ARZAQ"
        className="w-[60px] h-[60px] object-contain"
      />
    </div>
  );
}
