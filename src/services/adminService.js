import db from "../models/index";

let getListPublisher = () => {
    return new Promise(async (resolve, reject) => {
        try {
        let pubs = await db.Publisher.findAll({
            attributes: ["id", "namePublisher"],
            raw: true,
            nest: true,
        });
        resolve(pubs);
        } catch (e) {
        reject(e);
        }
    });
}

let getListCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
        let cats = await db.Category.findAll({
            attributes: ["id", "nameCategory"],
            raw: true,
            nest: true,
        });
        resolve(cats);
        } catch (e) {
        reject(e);
        }
    });
}

let getListAuthor = () => {
    return new Promise(async (resolve, reject) => {
        try {
        let authors = await db.Author.findAll({
            attributes: ["id", "nameAuthor"],
            raw: true,
            nest: true,
        });
        resolve(authors);
        } catch (e) {
        reject(e);
        }
    });
}

let createNewPublisher = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.namePublisher ||
                !data.address
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Publisher.create({
                    namePublisher: data.namePublisher,
                    address: data.address
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.nameCategory ||
                !data.description
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Category.create({
                    nameCategory: data.nameCategory,
                    description: data.description
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let createNewAuthor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.nameAuthor ||
                !data.birthday
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Author.create({
                    nameAuthor: data.nameAuthor,
                    birthday: data.birthday
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let editPublisher = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.id ||
                !data.namePublisher ||
                !data.address
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Publisher.update({
                    namePublisher: data.namePublisher,
                    address: data.address
                }, {
                    where: {
                        id: data.id
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let editCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.id ||
                !data.nameCategory ||
                !data.description
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Category.update({
                    nameCategory: data.nameCategory,
                    description: data.description
                }, {
                    where: {
                        id: data.id
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let editAuthor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.id ||
                !data.nameAuthor ||
                !data.birthday
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Author.update({
                    nameAuthor: data.nameAuthor,
                    birthday: data.birthday
                }, {
                    where: {
                        id: data.id
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let deletePublisher = (pubId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !pubId
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Publisher.destroy({
                    where: {
                        id: pubId
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteCategory = (cateId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !cateId
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Category.destroy({
                    where: {
                        id: cateId
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteAuthor = (authorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !authorId
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Author.destroy({
                    where: {
                        id: authorId
                    }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
              });
        } catch (e) {
            reject(e);
        }
    })
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