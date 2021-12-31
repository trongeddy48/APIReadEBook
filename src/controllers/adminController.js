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

let editPublisher = async (req, res) => {
    try {
        let info = await adminService.editPublisher(req.body);
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

let editCategory = async (req, res) => {
    try {
        let info = await adminService.editCategory(req.body);
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

let editAuthor = async (req, res) => {
    try {
        let info = await adminService.editAuthor(req.body);
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

let deletePublisher = async (req, res) => {
    try {
        let info = await adminService.deletePublisher(req.query.id);
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

let deleteCategory = async (req, res) => {
    try {
        let info = await adminService.deleteCategory(req.query.id);
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

let deleteAuthor = async (req, res) => {
    try {
        let info = await adminService.deleteAuthor(req.query.id);
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
    editPublisher: editPublisher,
    editCategory: editCategory,
    editAuthor: editAuthor,
    deletePublisher: deletePublisher,
    deleteCategory: deleteCategory,
    deleteAuthor: deleteAuthor,
}