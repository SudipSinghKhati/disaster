import multer from "multer";
import path from "path";
const maxSize = 1 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "public/uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    cb(null, `IMG-${Date.now()}` + ext);
  },
});

const imageFileFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("File format not supported."), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: maxSize },
}).single("RoomImages");

export = upload;
