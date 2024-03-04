import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ username, caption }) => {
    return (
        <div className="p-4 pt-2 pb-0">
            <span className="mr-1 font-bold">{username}</span>
            <span className="">{caption}</span>
        </div>
    );
};

Footer.propTypes = {
    username: PropTypes.string,
    caption: PropTypes.string,
};

export default Footer;
