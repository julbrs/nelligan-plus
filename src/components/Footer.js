import React from "react";

const Footer = () => {
  return (
    <div className="bg-teal-800 p-4 grid grid-cols-3 gap-4 text-white">
      <p className="text-center">
        <strong>Nelligan+</strong> par{" "}
        <a
          className="text-teal-200 font-extrabold"
          href="http://github.com/bobman38"
          target="_blank"
          rel="noopener noreferrer"
        >
          Julien Bras
        </a>
      </p>
      <p className="text-center">
        <a
          className="text-teal-200 font-extrabold"
          href="https://github.com/bobman38/nelligan-plus/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bugs ?
        </a>
      </p>
      <p className="text-center">
        Parlez de Nelligan+ sur{" "}
        <a
          className="text-teal-200 font-extrabold"
          href="https://www.facebook.com/nelliganapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        !
      </p>
    </div>
  );
};

export default Footer;
