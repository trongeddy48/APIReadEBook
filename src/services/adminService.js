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

module.exports = {
    getListPublisher: getListPublisher,
    getListCategory: getListCategory,
    getListAuthor: getListAuthor,
    createNewPublisher: createNewPublisher,
    createNewCategory: createNewCategory,
    createNewAuthor: createNewAuthor,
}