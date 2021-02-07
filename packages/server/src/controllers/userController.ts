// Firebase
import { User } from '@entities/User';
import { firebaseAdmin } from '@src/utils/auth/firebaseAdmin';

// Utils
import { getRepository } from 'typeorm';

// Gets or register the user and returns it
export const getOrRegisterUser = async (
  user: firebaseAdmin.auth.DecodedIdToken
) => {
  try {
    // Repositories
    const userRepository = await getRepository(User);

    let name = '';
    let surname = '';

    // Handles name and surname
    if (user?.name) {
      name = user.name.substr(0, user.name.indexOf(' '));
      surname = user.name.substr(user.name.indexOf(' ') + 1);
    }

    //Search for user
    let foundUser = await userRepository.findOne({
      where: { id: user.uid },
      cache: true,
    });

    if (!foundUser) {
      foundUser = await userRepository.create({
        id: user.uid,
        firstName: name,
        lastName: surname,
        email: user.email,
        picture: user.picture,
      });

      foundUser.save();
    }

    return foundUser;
  } catch (error) {
    console.error('Could not get or register user: ', error);
    return;
  }
};
