import db from "../models/index";

let getListPublisher = () => {
    return new Promise(async (resolve, reject) => {
        try {
        let pubs = await db.Publisher.findAll({
            attributes: ["id", "namePublisher", "address", "description", "imagePublisher"],
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
            attributes: ["id", "nameCategory", "description", "imageCategory"],
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
            attributes: ["id", "nameAuthor","birthday", "description", "imageAuthor"],
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
                !data.address ||
                !data.description ||
                !data.imagePublisher
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Publisher.create({
                    namePublisher: data.namePublisher,
                    address: data.address,
                    description: data.description,
                    imagePublisher: data.imagePublisher
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
                !data.description ||
                !data.imageCategory
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Category.create({
                    nameCategory: data.nameCategory,
                    description: data.description,
                    imageCategory: data.imageCategory
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
                !data.birthday ||
                !data.description ||
                !data.imageAuthor
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Author.create({
                    nameAuthor: data.nameAuthor,
                    birthday: data.birthday,
                    description: data.description,
                    imageAuthor: data.imageAuthor
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
                !data.address ||
                !data.description ||
                !data.imagePublisher
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Publisher.update({
                    namePublisher: data.namePublisher,
                    address: data.address,
                    description: data.description,
                    imagePublisher: data.imagePublisher
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
                !data.description ||
                !data.imageCategory
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Category.update({
                    nameCategory: data.nameCategory,
                    description: data.description,
                    imageCategory: data.imageCategory
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
                !data.birthday ||
                !data.description ||
                !data.imageAuthor
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                await db.Author.update({
                    nameAuthor: data.nameAuthor,
                    birthday: data.birthday,
                    description: data.description,
                    imageAuthor: data.imageAuthor
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

let handleLoginAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(
                !data.username ||
                !data.password
            ) {
                resolve({
                  errCode: 1,
                  errMessage: "Invalid data",
                });
            } else {
                let roleAdmin = await db.User.findOne({
                    where: {
                        username: data.username,
                        password: data.password
                    },
                    attributes: {
                        exclude: ['password']
                    }
                });
                if(roleAdmin != null){
                    if(roleAdmin.roleUser == 'admin') {
                        resolve({
                            errCode: 0,
                            errMessage: 'Ok',
                            roleAdmin,
                        });
                    }else {
                        resolve({
                            errCode: 2,
                            errMessage: 'Invalid username or password',
                        });
                    }
                }else {
                    resolve({
                        errCode: 3,
                        errMessage: 'Not account admin',
                    });
                }
            }
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

    handleLoginAdmin: handleLoginAdmin,
}