import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const User = ({ username, fullName }) => {
    return !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link
            to={`/p/${username}`}
            className="grid grid-cols-4 gap-4 mb-6 items-center"
        >
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={`./instagram/images/avatars/${username}.jpg`}
                    alt=""
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    );
};

export default memo(User);

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string,
};

User.whyDidYouRender = true;
