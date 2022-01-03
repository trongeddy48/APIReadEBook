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
          "imageDocument",
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
            // where: db.Document.publisherId == db.Publisher.id,
          },
          {
            model: db.Author,
            required: true,
            as: "authorData",
            attributes: ["nameAuthor"],
            // where: db.Document.authorId == db.Author.id,
          },
          {
            model: db.Category,
            required: true,
            as: "categoryData",
            attributes: ["nameCategory"],
            // where: db.Document.categoryId == db.Category.id,
          },
        ],
        raw: true,
        nest: true,
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
        attributes: ["imageDocument", "content"],
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
        !data.smallDescription ||
        // !data.pageNumber ||
        !data.imageDocument ||
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
          smallDescription: data.smallDescription,
          pageNumber: data.pageNumber,
          imageDocument: data.imageDocument,
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
        !data.smallDescription ||
        // !data.pageNumber ||
        !data.imageDocument ||
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
            smallDescription: data.smallDescription,
            pageNumber: data.pageNumber,
            imageDocument: data.imageDocument,
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
        if (db.Savedoc.findOne({ where: { documentId: docId } })) {
          await db.Savedoc.destroy({
            where: { documentId: docId },
          });
        }

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

let getDetailDocument = (docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doc = await db.Document.findOne({
        attributes: [
          "id",
          "nameDocument",
          "smallDescription",
          "pageNumber",
          "imageDocument",
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
            // where: db.Document.publisherId == db.Publisher.id,
          },
          {
            model: db.Author,
            required: true,
            as: "authorData",
            attributes: ["nameAuthor"],
            // where: db.Document.authorId == db.Author.id,
          },
          {
            model: db.Category,
            required: true,
            as: "categoryData",
            attributes: ["nameCategory"],
            // where: db.Document.categoryId == db.Category.id,
          },
        ],
        where: { id: docId },
        raw: true,
        nest: true,
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

let getDocumentByAuthor = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docs = await db.Author.findAll({
        where: { id: authorId },
        attributes: ["id", "nameAuthor", "birthday"],
        include: [
          {
            model: db.Document,
            required: true,
            as: "authorData",
            attributes: ["id", "nameDocument", "imageDocument"],
            where: db.Document.authorId == db.Author.id,
            include: [
              {
                model: db.Publisher,
                required: true,
                as: "publisherData",
                attributes: ["namePublisher"],
                where: db.Document.publisherId == db.Publisher.id,
              },
              {
                model: db.Category,
                required: true,
                as: "categoryData",
                attributes: ["nameCategory"],
                where: db.Document.categoryId == db.Category.id,
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(docs);
    } catch (e) {
      reject(e);
    }
  });
};

let getDocumentByCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docs = await db.Category.findAll({
        where: { id: categoryId },
        attributes: ["id", "nameCategory"],
        include: [
          {
            model: db.Document,
            required: true,
            as: "categoryData",
            attributes: ["id", "nameDocument", "imageDocument"],
            where: db.Document.categoryId == db.Category.id,
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
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(docs);
    } catch (e) {
      reject(e);
    }
  });
};

let getDocumentByPublisher = (publisherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docs = await db.Publisher.findAll({
        where: { id: publisherId },
        attributes: ["id", "namePublisher", "address"],
        include: [
          {
            model: db.Document,
            required: true,
            as: "publisherData",
            attributes: ["id", "nameDocument", "imageDocument"],
            where: db.Document.publisherId == db.Publisher.id,
            include: [
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
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(docs);
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Category.findOne({
        where: { id: categoryId },
        attributes: ["id", "nameCategory", "description", "imageCategory"],
        raw: true,
        nest: true,
      });
      resolve(category);
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoAuthor = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let author = await db.Author.findOne({
        where: { id: authorId },
        attributes: [
          "id",
          "nameAuthor",
          "birthday",
          "description",
          "imageAuthor",
        ],
        raw: true,
        nest: true,
      });
      resolve(author);
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoPublisher = (publisherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let publisher = await db.Publisher.findOne({
        where: { id: publisherId },
        attributes: ["id", "namePublisher", "address", "imagePublisher"],
        raw: true,
        nest: true,
      });
      resolve(publisher);
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
  getDetailDocument: getDetailDocument,
  getDocumentByAuthor: getDocumentByAuthor,
  getDocumentByCategory: getDocumentByCategory,
  getDocumentByPublisher: getDocumentByPublisher,

  getInfoCategory: getInfoCategory,
  getInfoAuthor: getInfoAuthor,
  getInfoPublisher: getInfoPublisher,
};
