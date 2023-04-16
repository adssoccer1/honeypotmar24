import { auth, db } from '../../lib/firebase';
import { ref, set, update, get, push, query, equalTo, orderByChild } from 'firebase/database';

const updateUser = async (req, res) => {
  console.log("update user api route hit");
  try {
    const { user, fieldToUpdate, newValue } = req.body;
    console.log("the fields you are updating are: ", user, " ", fieldToUpdate, " -> ", newValue);

    const userRef = ref(db, `users/${user.id}`);

    await update(userRef, { [fieldToUpdate]: newValue });

    res.status(200).json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user: ' + error.message });
  }
};

export default updateUser;
