export const saveSensorData = async (req, res, next) => {
    try {
      console.log(req.body);
      res.json(req.body);
    } catch (error) {
      next(error);
    }
  };