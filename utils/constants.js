const Sequelize = require("sequelize");

exports.collectionData = {
  SETTINGS: {
    tableName: "settings",
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
      allow_ip: { type: Sequelize.STRING, defaultValue: "" },
      pin_code: { type: Sequelize.STRING, defaultValue: "" },
      city: { type: Sequelize.STRING, defaultValue: "" },
      country: { type: Sequelize.STRING, defaultValue: "" },
      address: { type: Sequelize.STRING, defaultValue: "" },
      user_chain: { type: Sequelize.STRING, defaultValue: "" },
      account_validity: { type: Sequelize.DATE },
      account_status: { type: Sequelize.INTEGER },
      created_date: { type: Sequelize.DATE },
      is_deleted: { type: Sequelize.INTEGER },
      balance: { type: Sequelize.INTEGER, defaultValue: 0 },
    },
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
      phone_code: { type: Sequelize.STRING },
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
  FUND_TRANSACTIONS: {
    tableName: "fund_transactions",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      sender_id: { type: Sequelize.INTEGER },
      receiver_id: { type: Sequelize.INTEGER },
      amount: { type: Sequelize.INTEGER },
      type: { type: Sequelize.ENUM("debit", "credit", "Pending") },
      status: { type: Sequelize.INTEGER },
    },
    validator: {},
  },
  USERCONTACTS: {
    tableName: "usercontacts",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER },
      group_id: { type: Sequelize.INTEGER },
      contact: { type: Sequelize.INTEGER },
      country_code: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      var1: { type: Sequelize.STRING, defaultValue: "" },
      var2: { type: Sequelize.STRING, defaultValue: "" },
      var3: { type: Sequelize.STRING, defaultValue: "" },
      var4: { type: Sequelize.STRING, defaultValue: "" },
      var5: { type: Sequelize.STRING, defaultValue: "" },
      var6: { type: Sequelize.STRING, defaultValue: "" },
    },
    validator: {},
  },
  USERGROUPS: {
    tableName: "usergroups",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER },
      group_name: { type: Sequelize.INTEGER },
      is_address_book: { type: Sequelize.INTEGER, defaultValue: "1" },
      count: { type: Sequelize.INTEGER, defaultValue: "0" },
      duplicate_count: { type: Sequelize.INTEGER, defaultValue: "0" },
    },
    validator: {},
  },
  SERVICES: {
    tableName: "services",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.INTEGER },
      status: { type: Sequelize.INTEGER, defaultValue: "1" },
    },
    validator: {},
  },
  WHATSAPP_TEMPLATE_CATEGORIES: {
    tableName: "whatsapp_template_categories",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING },
      status: { type: Sequelize.INTEGER, defaultValue: "1" },
    },
    validator: {},
  },
  MEDIA_UPLOAD: {
    tableName: "media_upload",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER },
      file_name: { type: Sequelize.STRING },
      mimetype: { type: Sequelize.STRING },
      size: { type: Sequelize.STRING },
      upload_status: { type: Sequelize.INTEGER, defaultValue: "0" },
      mediaId: { type: Sequelize.STRING, defaultValue: "" },
      status: { type: Sequelize.INTEGER, defaultValue: "1" },
    },
    validator: {},
  },
  TEMPLATES: {
    tableName: "templates",
    schema: {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      language: { type: Sequelize.STRING },
      category: { type: Sequelize.STRING },
      header: { type: Sequelize.TEXT },
      body: { type: Sequelize.TEXT },
      footer: { type: Sequelize.TEXT },
      buttons: { type: Sequelize.TEXT },
      status: { type: Sequelize.STRING, defaultValue: "1" },
      approval_status: { type: Sequelize.INTEGER, defaultValue: "0" },
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

exports.RAWQUERIES = {
  GETUSERTYPRES:
    "select *  from usertypes where FIND_IN_SET(:userType,isAccess) and status='1'",
  GETTRANSACTIONS:
    // "select * from fund_transactions where sender_id = :userId or receiver_id = :userId order by created_date desc",
    `select ft.*,sen.username as sender_name,rec.username as rec_name from 
fund_transactions ft 
left join users sen on sen.id = ft.sender_id
left join users rec on rec.id = ft.receiver_id
where ft.sender_id = :userId or ft.receiver_id = :userId order by ft.created_date desc`,
};
