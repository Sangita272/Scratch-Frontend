import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { classNames } from "../helpers/classNames";
import Image from "../components/elements/Image";
import Button from "../components/form/Button";

const DefaultAdminHeader = ({
  data,
  isMenuData,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const onPress = (e) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      var headerOffset = 80;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        behavior: "smooth",
        top: offsetPosition,
      });
    }
  };

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 py-1 z-50 w-full flex items-center px-6 bg-primaryAlt shadow gap-4">
        <div className="relative flex gap-2">
          <Button
            buttonType={"button"}
            buttonIcon={"fa-solid fa-bars"}
            buttonIconPosition={"left"}
            buttonClasses={
              "px-0 w-10  !text-secondaryColor  hover:!text-slate-100"
            }
            buttonFunction={menuToggle}
          />
        </div>
      </header>
    </>
  );
};

export default DefaultAdminHeader;
