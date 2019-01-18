import { userModel } from '../models';

const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch(e) {
    res.status(422).json({
      error: e.message,
      raw: e,
    });
  }
}

export default { getUsers };