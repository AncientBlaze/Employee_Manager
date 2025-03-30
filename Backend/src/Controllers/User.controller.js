import User from "../Models/User.model.js";

const insert = async (req, res) => {
  const { empName, username, password } = req.body;
  const user = {
    empName,
    username,
    password,
  };
  try {
    const response = await User.insertOne(user);
    return res.send({
      success: true,
      message: "Employee added successfully",
      data: response,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await User.findOne({ username: username });

    if (!userData) {
      return res.send({
        status: false,
        message: "User not found",
      });
    }

    if (userData.password !== password) {
      return res.send({
        status: false,
        message: "Invalid password",
      });
    } else {
      return res.send({
        status: true,
        message: "Login successful",
        data: userData,
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

const updateTask = async (req, res) => {
  const { id, taskType, operation } = req.body;

  if (!id || !taskType || !operation) {
    return res.status(400).json({
      status: false,
      message: "ID, taskType, and operation are required",
    });
  }

  const allowedTaskTypes = ["newTask", "acttask", "completedTask", "failed"];

  if (!allowedTaskTypes.includes(taskType)) {
    return res.status(400).json({
      status: false,
      message: `Invalid taskType. Allowed values: ${allowedTaskTypes.join(
        ", "
      )}`,
    });
  }

  const incrementValue =
    operation === "increase" ? 1 : operation === "decrease" ? -1 : null;

  if (incrementValue === null) {
    return res.status(400).json({
      status: false,
      message: "Invalid operation. Use 'increase' or 'decrease'.",
    });
  }

  try {
    const response = await User.updateOne(
      { _id: id },
      { $inc: { [taskType]: incrementValue } }
    );

    return res.status(200).json({
      status: true,
      message: `${taskType} ${operation}d successfully`,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await User.find();

    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await User.find({ _id: id });

    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

const deleteNewTAsk = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await User.updateOne(
      { _id: id },
      { $set: { newTask: 0 } }
    );

    if (response) {
      return res.send({
        status: true,
        data: response,
      });
    } else {
      return res.send({
        status: false,
        error: error,
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

export { insert, login, updateTask, getAllUser, getUserById, deleteNewTAsk };
