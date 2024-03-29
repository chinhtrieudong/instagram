import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded bg-white col-span-4 border border-gray-primary mb-16">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer username={content.username} caption={content.caption} />
            <Comments
                docId={content.docId}
                posted={content.dateCreated}
                comments={content.comments}
                commentInput={commentInput}
            />
        </div>
    );
};

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comment: PropTypes.array,
        dateCreated: PropTypes.number.isRequired,
    }),
};

export default Post;
