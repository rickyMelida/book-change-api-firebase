module.exports.ApiResponse = {
  OK: (res, data = { message: "OK" }) => {
    return res.status(200).send(data);
  },

  Created: (res, dataCreated) => {
    return res.status(201).send(dataCreated);
  },

  NotContent: (res, message = "Not Content") => {
    return res.status(204).send({ message });
  },

  BadRequest: (res, message = "Bad Request") => {
    return res.status(400).send({ message });
  },

  Unauthorized: (res, message = "User Unauthorized") => {
    return res.status(401).send({ message });
  },

  Forbidden: (res, message = "Forbidden") => {
    return res.status(403).send({ message });
  },

  NotFound: (res, message = "Page Not Found") => {
    return res.status(404).send({ message });
  },

  InternalServerError: (res, message = "Internal Server Error") => {
    return res.status(500).send({ message });
  },
};
