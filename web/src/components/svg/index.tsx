import "@/assets/svg/icon-template.svg";
import "@/assets/svg/arrow-left.svg";
import React from "react";
import classnames from 'classnames';

const Svg = (props) => {
    const { icon, className, ...rest } = props;
    return (
        <svg
            fill="currentColor"
            className={classnames('u-svg', className)}
            { ...rest }
            dangerouslySetInnerHTML={{
                __html: `<use xlink:href="#${icon}" href="#${icon}"></use>`,
            }}>
        </svg>
    );
};

export default Svg;
