const usersRouter = require("express").Router();
const User = require("../models/userModel.js");

const getAllUsers = async (req, res) => {
  res.json(await User.find({}));
};

const signup = async (req, res) => {
  try {
    const { email, password, name, timeZone } = req.body;
    console.log(req.body);
    if (email && password) {
      const user = new User({ name, password, email, timeZone });
      console.log(user);
      await user.save();
      res.json(user);
    } else {
      res
        .status(400)
        .json({ error: "email and passwords are required fileds" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (email && password) {
      const user = await User.findOne({ email, password }).lean();
      if (!user) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect!" });
      }
      res.json(user);
    } else {
      res.status(400).json({ error: "invalid email and passwords!" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const logout = (req, res) => {
  const { email, password, name, timeZone } = req.body;
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).lean();
    if (!user) {
      res.status(404).json({ error: "user NotFound" });
    }

    const bookedSlots = await User.find({ "slots.userId": user._id })
      .select("_id, slots.$")
      .lean();
    res.json({ ...user, bookedSlots });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const updates = JSON.parse(JSON.stringify(req.body));
  User.findOneAndUpdate({ _id: userId }, updates); // FIXME just for testing
};

const updateSlots = async (req, res) => {
  try {
    const { userId } = req.params;
    const { slots } = JSON.parse(JSON.stringify(req.body));
    await User.findOneAndUpdate({ _id: userId }, { slots }); // FIXME just for testing
    res.sendStatus(200);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};

usersRouter.route("/login").post(login);

usersRouter.route("/logout").get(logout);

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(signup);

usersRouter
  .route("/:userId")
  .get(getUser)
  .post(updateUser);

usersRouter.route("/:userId/slots").post(updateSlots);

module.exports = usersRouter;
