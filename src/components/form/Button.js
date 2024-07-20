import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from "../../helpers/classNames";

const Button = ({
  buttonEffect = "",
  buttonClasses,
  buttonType,
  buttonIcon,
  buttonIconPosition,
  buttonLabel,
  buttonLabelClasses,
  buttonFunction = () => { },
  buttonHasLink,
  buttonLink,
  isDisable = false,
  ...props
}) => {

  const effect = {
    filled: "z-0 before:content-[''] before:z-[-1] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-secondaryColor before:scale-x-0 before:transition-all before:duration-200 hover:before:scale-x-100 before:origin-center",
    hollow: "z-0 before:content-[''] before:z-[-1] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-slate-100 before:scale-x-0 before:transition-all before:duration-200 hover:before:scale-x-100 before:origin-center border border-slate-200 bg-slate-50 hover:border-slate-300"
  }

  return (
    <>
      {buttonHasLink ?
        (
          <Link to={buttonLink}
            className={classNames(
              "relative overflow-hidden flex justify-center items-center gap-2 bg-primaryAlt text-white rounded-lg text-lg h-12 py-0 px-5 transition-all duration-200", buttonClasses, effect[buttonEffect], isDisable ? "pointer-events-none opacity-75" : ""
            )}
          >
            {buttonIconPosition === 'left' &&
              <i className={classNames("fa-fw", buttonIcon)}></i>
            }
            {buttonLabel &&
              <span className={classNames("text-base transition-all duration-200", buttonLabelClasses)}>{buttonLabel}</span>
            }
            {buttonIconPosition === 'right' &&
              <i className={classNames("fa-fw", buttonIcon)}></i>
            }
          </Link>
        ) :
        (
          <button
            type={buttonType}
            className={classNames(
              "relative overflow-hidden flex justify-center items-center gap-2 bg-primaryAlt text-white rounded-lg text-lg h-12 py-0 px-5 transition-all duration-200", buttonClasses, effect[buttonEffect], isDisable ? "pointer-events-none opacity-75" : ""
            )}
            onClick={buttonFunction}
            disabled={isDisable}
          >
            {buttonIconPosition === 'left' &&
              <i className={classNames("fa-fw", buttonIcon)}></i>
            }
            {buttonLabel &&
              <span className={classNames("text-base transition-all duration-200", buttonLabelClasses)}>{buttonLabel}</span>
            }
            {buttonIconPosition === 'right' &&
              <i className={classNames("fa-fw", buttonIcon)}></i>
            }
          </button>
        )
      }
    </>
  );
};

export default Button;