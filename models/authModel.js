module.exports = {
  authModel: (body) => {
    try {
      console.log("in model", body);
      delete body.password;
      return { response: body };
    } catch (error) {
      return { message: error.meassage };
    }
  },
};
