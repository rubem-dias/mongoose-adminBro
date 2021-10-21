
// ======================
// Database
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    completed: Boolean,
    created_at: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", ProjectSchema);



// ======================
// Admin Bro
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express') // connector between admin-bro and express
const AdminBroMongoose = require('@admin-bro/mongoose') // connector between admin-bro and mongoose

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

const adminBroOptions = new AdminBro({
    resources: [Project],
    rootPath: '/admin'
})
const router = AdminBroExpress.buildRouter(adminBroOptions)


//========================
// Server
const express = require('express');
const server = express();


server
    .use(adminBroOptions.options.rootPath, router) // a middleware (config inside route, in this case, creating a route).
// =============================================
// Run App
const run = async () => {
    await mongoose.connect("mongodb://localhost/adminbroapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await server.listen(5500, () => console.log("Server started"));
}

run();
