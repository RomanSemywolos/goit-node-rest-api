import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";

const User = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "name must be exist"
      },
      notEmpty: {
        msg: "name cannot be empty"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "email must be exist"
      },
      notEmpty: {
        msg: "email cannot be empty"
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "phone must be exist"
      },
      notEmpty: {
        msg: "phone cannot be empty"
      }
    }
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
