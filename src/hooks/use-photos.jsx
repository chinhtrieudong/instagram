import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '~/services/firebase';

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const userContext = useContext(UserContext);
    const userId = userContext?.user?.uid || ' ';

    useEffect(() => {
        async function getTimelinePhotos() {
            // Check if userId is valid
            if (userId && userId !== ' ') {
                const [{ following }] = await getUserByUserId(userId);
                let followedUserPhotos = [];

                if (following.length > 0) {
                    followedUserPhotos = await getPhotos(userId, following);

                    //re-arrange array to be newest photos first by dateCreated
                    followedUserPhotos.sort(
                        (a, b) => b.dateCreated - a.dateCreated,
                    );
                    setPhotos(followedUserPhotos); // Set the fetched photos here
                }
            }
        }

        getTimelinePhotos();
    }, [userId]); // Add userId as a dependency

    return { photos };
}
