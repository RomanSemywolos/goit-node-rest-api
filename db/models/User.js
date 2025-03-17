import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import { emailRegexp } from "../../constants/auth.js";

const User = sequelize.define("User", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: emailRegexp,
    },
    unique: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({ alter: true });

export default User;
