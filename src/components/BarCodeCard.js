import { useBarcode } from "react-barcodes";

import logo from "./images/logo.png";

const BarCodeCard = (props) => {
  const { value, setBarCode } = props;
  const { inputRef } = useBarcode({
    value: value,
    options: {
      format: "codabar",
      width: "2",
      height: "50",
    },
  });
  return (
    <div>
      <p className="italic text-gray-600 text-sm text-right mb-2">
        Press the card to go back...
      </p>
      <div
        className="border border-gray-600 rounded pt-4 cursor-pointer max-w-lg m-auto"
        onClick={() => setBarCode(null)}
      >
        <div className="flex">
          <img src={logo} className="w-24 h-24 hidden sm:block" />
          <div className="w-full">
            <p className="text-center font-mono">Carte d'abonné</p>
            <svg ref={inputRef} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCodeCard;
