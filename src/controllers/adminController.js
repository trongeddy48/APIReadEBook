import adminService from '../services/adminService';

let getListPublisher = async (req, res) => {
    try {
        let info = await adminService.getListPublisher();
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

let getListCategory = async (req, res) => {
    try {
        let info = await adminService.getListCategory();
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

let getListAuthor = async (req, res) => {
    try {
        let info = await adminService.getListAuthor();
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

let createNewPublisher = async (req, res) => {
    try {
        let info = await adminService.createNewPublisher(req.body);
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

let createNewCategory = async (req, res) => {
    try {
        let info = await adminService.createNewCategory(req.body);
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

let createNewAuthor = async (req, res) => {
    try {
        let info = await adminService.createNewAuthor(req.body);
        return res.status(200).json({
        info,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server...",
        });
    }
}

module.exports = {
    getListPublisher: getListPublisher,
    getListCategory: getListCategory,
    getListAuthor: getListAuthor,
    createNewPublisher: createNewPublisher,
    createNewCategory: createNewCategory,
    createNewAuthor: createNewAuthor,
}