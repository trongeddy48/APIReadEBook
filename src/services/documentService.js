import db from "../models/index";

let getListDocuments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let docs = await db.Document.findAll({
        where:
          db.Document.publisherId == db.Publisher.id &&
          db.authorId == db.Author.id &&
          db.categoryId == db.Category.id,

        attributes: [
          "id",
          "nameDocument",
          "pageNumber",
          "publisherId",
          "authorId",
          "categoryId",
        ],

        include: [
          {
            model: db.Publisher,
            required: true,
            as: "publisherData",
            attributes: ["namePublisher"],
            where: db.Document.publisherId == db.Publisher.id,
          },
          {
            model: db.Author,
            required: true,
            as: "authorData",
            attributes: ["nameAuthor"],
            where: db.Document.authorId == db.Author.id,
          },
          {
            model: db.Category,
            required: true,
            as: "categoryData",
            attributes: ["nameCategory"],
            where: db.Document.categoryId == db.Category.id,
          },
        ],
        raw: true,
      });
      resolve(docs);
    } catch (e) {
      reject(e);
    }
  });
};

let getDocumentById = (docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doc = await db.Document.findOne({
        attributes: ["content"],
        where: { id: docId },
        raw: true,
      });

      if (doc) {
        resolve(doc);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewDocument = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.nameDocument ||
        !data.content ||
        !data.pageNumber ||
        !data.publisherId ||
        !data.authorId ||
        !data.categoryId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Invalid data",
        });
      } else {
        await db.Document.create({
          nameDocument: data.nameDocument,
          content: data.content,
          pageNumber: data.pageNumber,
          publisherId: data.publisherId,
          authorId: data.authorId,
          categoryId: data.categoryId,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editDocument = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.nameDocument ||
        !data.content ||
        !data.pageNumber ||
        !data.publisherId ||
        !data.authorId ||
        !data.categoryId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Invalid data",
        });
      } else {
        await db.Document.update(
          {
            nameDocument: data.nameDocument,
            content: data.content,
            pageNumber: data.pageNumber,
            publisherId: data.publisherId,
            authorId: data.authorId,
            categoryId: data.categoryId,
          },
          {
            where: { id: data.id },
          }
        );
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteDocument = (docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!docId) {
        resolve({
          errCode: 1,
          errMessage: "Missing id doc",
        });
      } else {
        await db.Document.destroy({
          where: { id: docId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDocumentById: getDocumentById,
  getListDocuments: getListDocuments,
  createNewDocument: createNewDocument,
  editDocument: editDocument,
  deleteDocument: deleteDocument,
};
