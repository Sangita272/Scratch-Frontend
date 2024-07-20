import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { classNames } from "../helpers/classNames";
import Image from "../components/elements/Image";
import Button from "../components/form/Button";

const DefaultHeader = ({ data, isMenuData }) => {
  const [menuToggle, setMenuToggle] = useState(false);

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

  return (
    <>
      <header className="sticky z-10 top-0 w-full flex items-center h-20 bg-gradient-to-b from-primary to-primaryAlt to-40% shadow">
        <div className="w-full px-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-9xl mx-auto flex items-center">
          <div className="max-w-[200px] h-10 mr-auto">
            <Link to={"/"} className="block w-full h-full">
              <Image
                src={data.logo}
                alt={"Logo"}
                width={"100%"}
                height={"100%"}
                effect={"blur"}
                classes={"object-contain object-left"}
              />
            </Link>
          </div>
          <div
            className={classNames(
              "fixed z-10 xl:relative top-0 xl:top-auto left-0 xl:left-auto w-80 xl:w-auto h-full xl:h-auto bg-primary/95 xl:bg-transparent flex flex-col xl:flex-row xl:items-center xl:justify-end gap-8 py-5 xl:py-0 shadow-2xl xl:shadow-none xl:!translate-x-0 transition:all duration-300 p-10",
              menuToggle ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex items-center justify-center xl:hidden border-b border-slate-200 pb-5">
              <div className="h-14 mx-auto">
                <Image
                  src={data.logo}
                  alt={"Logo"}
                  width={"100%"}
                  height={"100%"}
                  effect={"blur"}
                  classes={"object-contain object-center"}
                />
              </div>
            </div>
            {isMenuData && data?.menu?.length > 0 && (
              <div className="block xl:flex items-center space-y-4 xl:space-y-0 xl:space-x-10">
                {data?.menu?.map((item) => (
                  <div className="relative" key={item._id}>
                    <NavLink
                      to={"#" + item.link}
                      onClick={(e) => onPress(e)}
                      className={({ isActive }) =>
                        classNames(
                          "relative flex items-center text-sm h-10 font-medium uppercase transition-all duration-200 text-white group/inactive group/active"
                        )
                      }
                      data-to-scrollspy-id={item.link}
                    >
                      {item.name}
                      <span className="block absolute bottom-0 left-0 w-full border-b-2 border-white scale-x-0 origin-center transition-all duration-300 group-[.active]/active:scale-x-100 group-hover/inactive:scale-x-100"></span>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
            <div className="relative flex space-x-3 sm:space-x-4 gap-1">
              {data.appDownload?.menu?.map((item) => (
                <div className="" key={item._id}>
                  <Link
                    to={item.link}
                    rel="noreferrer"
                    target="_blank"
                    className="text-white text-xs xl:text-sm transition-all duration-200 hover:text-pistachio-500"
                  >
                    <div className="h-9">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={"100%"}
                        height={"100%"}
                        effect={"blur"}
                        classes={"object-contain lg:object-left"}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {data.options && (
              <div className="flex items-center justify-center xl:justify-end gap-4 mt-auto border-t border-slate-200 pt-5 xl:border-none px-3 xl:p-0">
                {data?.options?.actionLabel && data?.options?.actionClick && (
                  <Button
                    buttonClasses={"!px-5 !h-10 w-full xl:w-auto"}
                    buttonFunction={data?.options?.actionClick}
                    buttonLabel={data?.options?.actionLabel}
                    buttonLabelClasses={"uppercase font-semibold !text-sm"}
                    buttonEffect={"filled"}
                  />
                )}
              </div>
            )}
          </div>
          <div className="ml-auto xl:hidden">
            <Button
              buttonClasses={"!bg-secondaryColor !px-0 w-12"}
              buttonHasLink={false}
              buttonFunction={() => setMenuToggle(!menuToggle)}
              buttonIcon={"fa-regular fa-bars"}
              buttonIconPosition={"left"}
            />
          </div>
        </div>
        <div
          className={classNames(
            "fixed z-[9] w-full h-full top-0 left-0 bg-secondaryColor/20 transition-all duration-300",
            menuToggle ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setMenuToggle(!menuToggle)}
        ></div>
      </header>
    </>
  );
};

export default DefaultHeader;
