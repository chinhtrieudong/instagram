import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '~/context/user';

const Image = ({ src, caption }) => {
    return <img src={`./instagram/${src}`} alt={caption} />;
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
};

export default Image;
