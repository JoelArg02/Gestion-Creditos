const s3 = require("../s3config"); 
const { v4: uuidv4 } = require("uuid");

class SpacesModel {
  constructor(bucketName) {
    this.bucketName = bucketName;
  }

  async uploadFile(fileBuffer, originalFileName) {
    const fileExtension = originalFileName.split(".").pop().toLowerCase();
    let folderName = "";

    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png"
    ) {
      folderName = "img/";
    } else if (fileExtension === "pdf") {
      folderName = "pdf/";
    }

    const newFileName = `${folderName}${uuidv4()}.${fileExtension}`;
    const params = {
      Bucket: this.bucketName,
      Key: newFileName,
      Body: fileBuffer,
      ACL: "public-read",
    };

    if (fileExtension === "pdf") {
      params.ContentDisposition = 'inline';
    }

    try {
      const data = await s3.upload(params).promise();
      return data;
    } catch (err) {
      console.error("Error in uploadFile: ", err);
      throw err;
    }
}


  async downloadFile(fileName) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body;
    } catch (err) {
      console.error("Error in downloadFile: ", err);
      throw err;
    }
  }

  async updateFile(fileBuffer, fileName) {
    return this.uploadFile(fileBuffer, fileName);
  }

  async deleteFile(fileName) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    try {
      const data = await s3.deleteObject(params).promise();
      return data;
    } catch (err) {
      console.error("Error in deleteFile: ", err);
      throw err;
    }
  }

  async listFiles() {
    const params = {
      Bucket: this.bucketName,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      return data.Contents;
    } catch (err) {
      console.error("Error in listFiles: ", err);
      throw err;
    }
  }
}

module.exports = SpacesModel;
