import React from 'react';
import Image from "../components/elements/Image";
import { classNames } from "../helpers/classNames";
import { Link } from "react-router-dom";

const DefaultFooter = ({ data }) => {
  return (
    <>
      <footer className="relative py-8 bg-gradient-to-tr from-primary to-primaryAlt to-40%">
        <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-texture bg-[length:24px_24px] bg-repeat opacity-10"></div>
        <div className="relative py-16 w-full px-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-9xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-center gap-10 lg:gap-5">
            <div className="w-full lg:w-4/12 xl:w-3/12 2xl:w-2/12 mx-auto lg:mx-0 flex items-center lg:border-r border-white/10">
              <div className="max-w-[200px] h-16 mx-auto lg:mr-auto">
                <Image src={data.logo} alt={'Logo'} width={'100%'} height={'100%'} effect={'blur'} classes={'object-contain lg:object-left'} />
              </div>
            </div>
            <div className="w-full lg:w-8/12 xl:w-7/12 2xl:w-6/12">
              <div className="grid grid-cols-2 sm:flex gap-y-10 sm:gap-y-0 gap-x-2 sm:gap-x-5">
                <div className="w-full sm:w-1/3 lg:w-3/12">
                  {data.footerMenu &&
                    <>
                      <h4 className="text-base xl:text-lg font-semibold text-white uppercase mb-6">{data.footerMenu?.title}</h4>
                      {data.footerMenu?.menu?.length > 0 &&
                        <div className="relative space-y-3 sm:space-y-4">
                          {data.footerMenu?.menu?.map((item) => (
                            <div className="flex" key={item._id}>
                              <Link to={item.link} className="text-white text-xs xl:text-sm transition-all duration-500 hover:text-secondaryColor hover:ml-1">{item.name}</Link>
                            </div>
                          ))}
                        </div>
                      }
                    </>
                  }
                </div>
                <div className="w-full sm:w-1/3 lg:w-4/12">
                  {data.contact &&
                    <>
                      <h4 className="text-base xl:text-lg font-semibold text-white uppercase mb-6">{data.contact?.title}</h4>
                      {data.contact?.subdata?.length > 0 &&
                        <div className="relative space-y-3 sm:space-y-4">
                          {data.contact?.subdata?.map((item) => (
                            <div className="" key={item._id}>
                              <Link
                                to={(item.type !== 'address') ? item.type + ":" + item.data : ''}
                                className={classNames("inline-flex gap-4 group", item.type === 'address' ? "pointer-events-none" : "")}
                              >
                                <div className="text-base text-secondaryColor"><i className={classNames("fa-regular fa-fw", item.icon)}></i></div>
                                <div className="text-white text-xs xl:text-sm transition-all duration-200 group-hover:text-secondaryColor">{item.data}</div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      }
                    </>
                  }
                </div>
                <div className="w-full col-span-2 sm:col-span-1 sm:w-1/3 lg:w-3/12">
                  {data.footerDownload &&
                    <>
                      <h4 className="text-base xl:text-lg font-semibold text-white uppercase mb-6 text-center sm:text-left">{data.footerDownload?.title}</h4>
                      {data.footerDownload?.menu?.length > 0 &&
                        <div className="relative space-x-3 sm:space-x-0 sm:space-y-4 flex justify-center sm:block">
                          {data.footerDownload?.menu?.map((item) => (
                            <div className="flex" key={item._id}>
                              <Link to={item.link} rel="noreferrer" target="_blank" className="text-white text-xs xl:text-sm transition-all duration-200">
                                <div className="flex h-10">
                                  <Image src={item.image} alt={item.name} width={'100%'} height={'100%'} effect={'blur'} classes={'object-contain lg:object-left'} />
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      }
                    </>
                  }
                  {data.socialMenu &&
                    <>
                      {data.socialMenu?.length > 0 &&
                        <div className="mt-8 flex items-center justify-center sm:justify-start gap-2">
                          {data.socialMenu?.map((item) => (
                            <a
                              key={item._id}
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center w-8 h-8 bg-secondaryColor rounded-md text-white transition-all duration-200 hover:text-primary hover:bg-white"
                            >
                              <i className={classNames("fa-brands fa-fw", item.icon)}></i>
                            </a>
                          ))}
                        </div>
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="relative py-5 w-full px-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto">
            <div className="text-center text-sm text-white">{data.copyright}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DefaultFooter;