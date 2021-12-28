import documentService from "../services/documentService";

let getListDocuments = async (req, res) => {
  let listDocs = await documentService.getListDocuments();

  return res.send({
    listDocs,
  });
};

let getDocumentById = async (req, res) => {
  let docId = req.query.id;
  if (docId) {
    let docData = await documentService.getDocumentById(docId);

    return res.send({
      doc: docData,
    });
  } else {
    return res.send("Document not found");
  }
};

module.exports = {
  getDocumentById: getDocumentById,
  getListDocuments: getListDocuments,
};
