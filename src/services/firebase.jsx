import { firebaseApp, FieldValue } from '~/lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebaseApp
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
    const result = await firebaseApp
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebaseApp
        .firestore()
        .collection('users')
        .limit(10)
        .get();

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter(
            (profile) =>
                profile.userId !== userId && following.includes(profile.userId),
        );
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // current user
    profileId, // user to follow
    isFollowingProfile,
) {
    return firebaseApp
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId) // remove from arr.
                : FieldValue.arrayUnion(), // add to arr.
        });
}

export async function updateFollowedUserFollowers(
    profileDocId, // current user
    loggedInUserDocId, // user to follow
    isFollowingProfile,
) {
    return firebaseApp
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId) // remove from arr.
                : FieldValue.arrayUnion(loggedInUserDocId), // add to arr.
        });
}
