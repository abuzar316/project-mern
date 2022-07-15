const db = require('../models/index');
const helper = require('../helper/helper');
const { permissionName, roleName } = require('../helper/data');

// create table
const createTable = async () => {
    // all table created in database successfully
    await db.sequelize.sync();
    console.log("-------------Table created successfully-------------");

    // create role in database
    const roleData = [{ id: 1, roleName: roleName.admin }, { id: 2, roleName: roleName.vendor }, { roleName: roleName.user }];
    await db.roles.bulkCreate(roleData);
    console.log("-------------roles inserted successfully-------------");

    //  permission inserted in database successfully
    const permissionData = [
        { permissionName: permissionName.createUser },
        { permissionName: permissionName.editUser },
        { permissionName: permissionName.deleteUser },
        { permissionName: permissionName.readUser },
    ];
    await db.permission.bulkCreate(permissionData);
    console.log("-------------permission inserted successfully-------------");

    console.log("-------------assign permission to role vender-------------");
    const rolePermissionData = [
        { roleId: '2', permissionId: '4' },
        { roleId: '2', permissionId: '2' }
    ];
    await db.rolePermission.bulkCreate(rolePermissionData);

    // admin user create
    const userData = { email: "abuzar@gmail.com", name: "Abuzar", gender: "male", password: await helper.hashPassword("123456"), roleId: 1 };
    await db.users.create(userData)
    console.log("-------------admin user created successfully-------------");

}

createTable();


