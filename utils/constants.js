const Sequelize = require("sequelize");

exports.collectionData = {
  SETTINGS: {
    tableName: "settings",
    //** Sample for MongoDB */
    /* schema: {
      keys: { type: String },
      value: { type: String }
     },*/
    //** Sample for MYSQL */
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      keys: { type: Sequelize.STRING, defaultValue: "" },
      value: { type: Sequelize.STRING, defaultValue: "" },
      host_id: { type: Sequelize.INTEGER, defaultValue: "" },
    },
    validator: {},
  },
  CATEGORIES: {
    tableName: "categories",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, defaultValue: "" },
      parent: { type: Sequelize.INTEGER, defaultValue: "0" },
      status: { type: Sequelize.INTEGER, defaultValue: "1" },
    },
    validator: {},
  },
  SUBCATEGORIES: {
    tableName: "subcategories",
    schema: {},
    validator: {},
  },
  PRODUCTS: {
    tableName: "products",
    schema: {},
    validator: {},
  },
  USERS: {
    tableName: "users",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_type: { type: Sequelize.INTEGER },
      parent_id: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, defaultValue: "" },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      mobile: { type: Sequelize.STRING },
      allow_ip: { type: Sequelize.STRING },
      account_validity: { type: Sequelize.DATE },
      account_status: { type: Sequelize.INTEGER },
      created_date: { type: Sequelize.DATE },
      is_deleted: { type: Sequelize.INTEGER },
    },
    validator: {},
  },
  CARTS: {
    tableName: "carts",
    schema: {},
    validator: {},
  },
  WISHLISTS: {
    tableName: "wishlists",
    schema: {},
    validator: {},
  },
  PERMISSIONS: {
    tableName: "permissions_usertypes",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_type: { type: Sequelize.INTEGER },
      text: { type: Sequelize.TEXT },
      status: { type: Sequelize.INTEGER },
      created_date: { type: Sequelize.DATE },
    },
    validator: {},
  },
  tableName: "permission_users",
  schema: {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER },
    text: { type: Sequelize.TEXT },
    status: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE },
  },
  validator: {},
  MENUS: {
    tableName: "menus",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, defaultValue: "" },
      permission_name: { type: Sequelize.STRING },
      href: { type: Sequelize.STRING },
      icon: { type: Sequelize.STRING },
      target: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER },
      parent_id: { type: Sequelize.INTEGER },
      priority: { type: Sequelize.INTEGER },
    },
    validator: {},
  },
  COUNTRIES: {
    tableName: "countries",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, defaultValue: "" },
      code: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER },
    },
    validator: {},
  },
  USERTYPES: {
    tableName: "usertypes",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, defaultValue: "" },
      isAdmin: { type: Sequelize.INTEGER },
      isAccess: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER },
    },
    validator: {},
  },
};

exports.FILTERS = {
  AND: "$and",
  OR: "$or",
  IN: "$in",
  NOTIN: "$nin",
  LT: "$lt",
  LTE: "$lte",
  GT: "$gt",
  GTE: "$gte",
  AGGREGATE: "aggregate",
};
