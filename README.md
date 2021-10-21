## AdminBro

1. Structure:

mkdir project
cd project
touch admin.js


2. Dependencies:

npm i admin-bro @admin-bro/express express express-formidable.
*that means install admin-bro; admin-bro with connection with express; express; and a dependence from express.*

3. admin.js

```js
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express') // connector between admin-bro and express

const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro) // builing a route with my new object adminbro inside.
```

root admin
npm install tslib *for errors*
npm install express-session *for errors*

4. DataBase

npm i @admin-bro/mongoose mongoose *connect mongoose to adminbro*

```js 
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  description: String,
  completed: Boolean,
  created_at: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", ProjectSchema);
```

5. Update file

```js
// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

// config
const adminBroOptions = new AdminBro({
	resources: [Project],
  rootPath: '/admin'
})
const router = AdminBroExpress.buildRouter(adminBroOptions)


// ============================================
// Server
const express = require("express");
const server = express();

server
  .use(adminBroOptions.options.rootPath, router)

// =============================================
// Run App
const run = async () => {
  await mongoose.connect("mongodb://localhost/adminbroapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  await server.listen(5500, () => console.log("Server started"));
}

run()
```