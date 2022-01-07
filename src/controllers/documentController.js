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

let createNewDocument = async (req, res) => {
  try {
    let info = await documentService.createNewDocument(req.body);
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
};

let editDocument = async (req, res) => {
  try {
    let info = await documentService.editDocument(req.body);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Ok",
      info,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let deleteDocument = async (req, res) => {
  try {
    let info = await documentService.deleteDocument(req.query.id);
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
};

let getDetailDocument = async (req, res) => {
  try {
    let info = await documentService.getDetailDocument(req.query.id);
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
};

let getDocumentByAuthor = async (req, res) => {
  try {
    let info = await documentService.getDocumentByAuthor(req.query.id);
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

let getDocumentByCategory = async (req, res) => {
  try {
    let info = await documentService.getDocumentByCategory(req.query.id);
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

let getDocumentByPublisher = async (req, res) => {
  try {
    let info = await documentService.getDocumentByPublisher(req.query.id);
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

let getInfoCategory = async (req, res) => {
  try {
    let info = await documentService.getInfoCategory(req.query.id);
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

let getInfoAuthor = async (req, res) => {
  try {
    let info = await documentService.getInfoAuthor(req.query.id);
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

let getInfoPublisher = async (req, res) => {
  try {
    let info = await documentService.getInfoPublisher(req.query.id);
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

let getDocumentByOrder = async (req, res) => {
  let listDocsByOrder = await documentService.getDocumentByOrder();
    return res.send({
      listDocsByOrder,
    });
}

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
  getDocumentByOrder: getDocumentByOrder,
};
