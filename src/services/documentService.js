import db from "../models/index";

let getListDocuments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let docs = await db.Document.findAll({
        attributes: [
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
            // where: db.Document.publisherId === db.Publisher.id,
          },
          {
            where: db.Document.authorId === db.Author.id,
            model: db.Author,
            required: true,
            as: "authorData",
            attributes: ["nameAuthor"],
            // where: db.Document.authorId === db.Author.id,
          },
          {
            model: db.Category,
            required: true,
            as: "categoryData",
            attributes: ["nameCategory"],
            // where: db.Document.categoryId === db.Category.id,
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

module.exports = {
  getDocumentById: getDocumentById,
  getListDocuments: getListDocuments,
};
