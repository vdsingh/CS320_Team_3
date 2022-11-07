import User from "../Models/User.js";

export const upload_user = function (user) {
  User.find({ employeeId: user.managerId, comanyId: user.companyId }).then(
    (foundUser) => {
      let obj = {};
      if (foundUser.length == 0) {
        const schema_user = new User ({
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          email: user.email,
          companyId: user.companyId,
          companyName: user.companyName,
          positionTitle: user.positionTitle,
          startDate: user.startDate,
          isManager: user.isManager,
          password: user.password,
        });
        schema_user.save().then((user) => console.log(user));
      } else {
        const schema_user = new User({
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          email: user.email,
          companyId: user.companyId,
          companyName: user.companyName,
          positionTitle: user.positionTitle,
          startDate: user.startDate,
          isManager: user.isManager,
          password: user.password,
          managerId: user.managerId,
          managerUId: foundUser[0]._id,
        });
        schema_user.save().then((user) => console.log(user));
      }
    }
  );
};
