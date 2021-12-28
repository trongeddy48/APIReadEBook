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
            as: "publisherData",
            attributes: ["namePublisher"],
          },
          {
            model: db.Author,
            as: "authorData",
            attributes: ["nameAuthor"],
          },
          {
            model: db.Category,
            as: "categoryData",
            attributes: ["nameCategory"],
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
