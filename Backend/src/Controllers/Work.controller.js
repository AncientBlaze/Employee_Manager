import Work from "../Models/Work.model.js";

const insert = async (req, res) => {
  const { title, work, date, assignTo, category } = req.body;
  const data = {
    title,
    date,
    assignTo,
    category,
    work,
  };

  try {
    const response = await Work.insertOne(data);
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

const getWorkById = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await Work.find({ assignTo: id });

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

const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const response = await Work.updateOne(
      {
        _id: id,
      },
      { $set: { status: status } }
    );

    return res.send({
      status: true,
      data: response,
    })
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

const deleteOneTask = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await Work.deleteOne({ _id: id });

    if (response) {
      return res.send({
        status: true,
        data: response
      })
    } else {
      return res.send({
        status: false,
        erroe: response
      })
    }
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    })
  }
}

const getallWork = async (req, res) => {
  try {
    const response = await Work.find({});
    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
}

export { insert, getWorkById, updateStatus, deleteOneTask, getallWork };
