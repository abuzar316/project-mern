
const db = require('../models/index');
const customErrorHandler = require('../error/customError');
const tryCarchMiddleware = require('../utils/tryCarchMiddleware');
const helper = require('../helper/helper');



module.exports.register = tryCarchMiddleware(async (req, res, next) => {
    const { email, password, name, username, roleId } = req.body;
    // console.log(req.body)
    // console.log(parseInt(roleId))
    const findUser = await db.users.findOne({ where: { email } });
    // console.log(findUser)
    // check all conditions
    switch (true) {
        case (!email, !password, !name, !username, !roleId):
            return next(customErrorHandler('All fields required', 409));

        case (!helper.emailValidate(email)):
            return next(customErrorHandler('Enter valid Email', 400));

        case (findUser !== null):
            return next(customErrorHandler('user allready exixt', 400));

        // case (!helper.passwordValidate(password)):
        // return next(customErrorHandler('Enter valid password'));

    }
    // console.log("first")
    const userData = { email, name, username, password: await helper.hashPassword(password), roleId: parseInt(roleId) || 3 }
    // create user in database
    const user = await db.users.create(userData);
    // console.log(user,"user")
    // console.log(user)
    // console.log(user)

    res.status(200).json({ statusCode: 200, status: true, message: "register successfully" })
});

module.exports.login = tryCarchMiddleware(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email, password)
    const user = await db.users.findOne({ where: { email } });
    // console.log(user.id)
    // console.log(user)

    if (user == null) {
        return next(customErrorHandler('Please enter valid email'));
    }
    const matchPassword = await helper.comparePassword(password, user.dataValues.password);
    if (!matchPassword) {
        return next(customErrorHandler('Please enter valid password'));
    }
    const token = helper.tokenGenrate(user.id, '24h');
    const sendUser = { name: user.name, email: user.email, token: token, roleId: user.roleId }
    res.status(200).json({ statusCode: 200, status: true, message: "Login successfully", user: sendUser })
});

module.exports.profile = tryCarchMiddleware(async (req, res, next) => {
    // const user = await db.users.findOne({ where: { email: req.user.email } });

    const userProfile = {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role.roleName,
        roleId: req.user.roleId,
        id: req.user.id
    }
    // console.log(req.user)
    res.status(200).json({ user: userProfile, status: true });

});

module.exports.profileUpdate = tryCarchMiddleware(async (req, res, next) => {
    console.log("first")
    const { email, username, name } = req.body;
    const user = await db.users.findOne({ where: { email: req.user.email } });

    user.email = email;
    user.username = username;
    user.name = name;
    user.save();


    res.status(200).json({ message: "user profile updated successfully", status: true });

});

module.exports.changePassword = tryCarchMiddleware(async (req, res, next) => {
    const { oldPassword, newPassword, newCPassword } = req.body;
    const user = await db.users.findOne({ where: { email: req.user.email } });

    const matchPass = await helper.comparePassword(oldPassword, user.password);


    if (!matchPass) {
        return next({ message: "oldPassword wrong password", status: false });
    }
    if (newPassword !== newCPassword) {
        return next({ message: "newpassword and new confirm password is wrong", status: false })
    }
    if (!helper.passwordValidate(newPassword)) {
        return next({ message: "please enetr a strong password", status: false });
    }

    user.password = await helper.hashPassword(newPassword);
    user.save();


    res.status(200).json({ message: "password change  successfully", status: true });
})

module.exports.allUser = tryCarchMiddleware(async (req, res, next) => {
    console.log("first")
    const allUserData = await db.users.findAll();
    const exixtUser = allUserData.filter(user => user.id !== req.user.id);
    res.status(200).json({ status: true, alluser: exixtUser });
});

module.exports.editUser = tryCarchMiddleware(async (req, res, next) => {
    const id = req.params.id;
    const { email, name, username } = req.body;

    const user = await db.users.findOne({ where: { id: id } });
    if (user === null) {
        next(customErrorHandler("user Not exist"));
    }
    user.name = name;
    user.email = email;
    user.gender = username;
    user.save();
    // console.log(user)
    res.status(200).json({ message: user, status: true });
});

module.exports.deleteUser = tryCarchMiddleware(async (req, res, next) => {
    const id = req.params.id;
    const user = await db.users.destroy({ where: { id: id } });
    // console.log("first")
    if (user === 0) {
        next(customErrorHandler("user not found"));
    }
    if (user !== 1) {
        next(customErrorHandler("user not deleted"));
    }
    // console.log(user)
    res.status(200).json({ msg: "user successfully deleted", status: true });
});

module.exports.data = tryCarchMiddleware(async (req, res, next) => {

    // const data = [{ roleName: 'admin' }, { roleName: 'editor' }, { roleName: 'user' }]

    // const role = await db.roles.bulkCreate(data);

    // const user = await db.users.findAll({
    //     include: [{
    //         model: db.roles,
    //     }]
    // });
    // console.log(user[0].role.roleName)

    // const per = {
    //     roleId: 1,
    //     permissionId: 32
    // };

    // const addData = await db.rolePermission.create(per);

    // console.log(addData)


    res.status(200).json("user")
})
