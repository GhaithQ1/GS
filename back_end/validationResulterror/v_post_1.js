const { check, body,validationResult } = require("express-validator");
const validationMiddiel = require("./validationResulte");
const Post = require("../models/post_1_Models");
const { mongo } = require("mongoose");


// =================================================================
exports.createPost_V = [
  body().custom((body) => {
    if (!body.writing && !body.img_post && !body.video_post) {
      throw new Error("The entry must contain at least one text, image, or video.");
    }
    return true;
  }),
  validationMiddiel,
];

exports.createPost_1_V = [
  check("word_1").notEmpty().withMessage("Add a word"),
  check("word_2").notEmpty().withMessage("Add a word"),
  check("word_3").notEmpty().withMessage("Add a word"),
  check("word_4").notEmpty().withMessage("Add a word"),
  check("word_5").notEmpty().withMessage("Add a word"),

  // middleware يدوي لفحص الصور
  (req, res, next) => {
    const errors = validationResult(req).array();

    if (!req.files?.postImage_1) {
      errors.push({ path: "postImage_1", msg: "Add a photo" });
    }
    if (!req.files?.postImage_2) {
      errors.push({ path: "postImage_2", msg: "Add a photo" });
    }
    if (!req.files?.postImage_3) {
      errors.push({ path: "postImage_3", msg: "Add a photo" });
    }
    if (!req.files?.postImage_4) {
      errors.push({ path: "postImage_4", msg: "Add a photo" });
    }
    if (!req.files?.postImage_5) {
      errors.push({ path: "postImage_5", msg: "Add a photo" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  },

  // للتأكد من إرسال النتيجة النهائية بعد التحقق
  validationMiddiel,
];


exports.createPost_2_V = [
  body("questions")
    .isArray({ min: 1 })
    .withMessage("You must add at least one question"),
  
  body("questions.*.question")
    .notEmpty()
    .withMessage("Each question must have a text"),

  body("questions.*.Answer_1")
    .notEmpty()
    .withMessage("Each question must have Answer 1"),

  body("questions.*.Answer_2")
    .notEmpty()
    .withMessage("Each question must have Answer 2"),

  body("questions.*.Answer_3")
    .notEmpty()
    .withMessage("Each question must have Answer 3"),

  body("questions.*.Answer_4")
    .notEmpty()
    .withMessage("Each question must have Answer 4"),

  validationMiddiel,
];


exports.createPost_3_V = [
  body("questions").isArray({ min: 1 }).withMessage("يجب إضافة سؤال واحد على الأقل"),

  body("questions.*.question")
    .notEmpty()
    .withMessage("كل سؤال يجب أن يحتوي على نص"),

  body("questions.*.condition")
    .not()
    .isEmpty()
    .withMessage("يجب تحديد ما إذا كانت الإجابة صحيحة أو خاطئة"),

  validationMiddiel,
];

exports.createPost_4_V = [
  check("question_1_img")
  .notEmpty().withMessage("Add a photo"),
  check("question_1_word_1")
  .notEmpty().withMessage("Add a word"),
  check("question_1_word_2")
  .notEmpty().withMessage("Add a word"),
  check("question_1_word_3")
  .notEmpty().withMessage("Add a word"),
  check("question_1_word_4")
  .notEmpty().withMessage("Add a word"),

  check("question_2_img")
  .notEmpty().withMessage("Add a photo"),
  check("question_2_word_1")
  .notEmpty().withMessage("Add a word"),
  check("question_2_word_2")
  .notEmpty().withMessage("Add a word"),
  check("question_2_word_3")
  .notEmpty().withMessage("Add a word"),
  check("question_2_word_4")
  .notEmpty().withMessage("Add a word"),

  check("question_3_img")
  .notEmpty().withMessage("Add a photo"),
  check("question_3_word_1")
  .notEmpty().withMessage("Add a word"),
  check("question_3_word_2")
  .notEmpty().withMessage("Add a word"),
  check("question_3_word_3")
  .notEmpty().withMessage("Add a word"),
  check("question_3_word_4")
  .notEmpty().withMessage("Add a word"),

  check("question_4_img")
  .notEmpty().withMessage("Add a photo"),
  check("question_4_word_1")
  .notEmpty().withMessage("Add a word"),
  check("question_4_word_2")
  .notEmpty().withMessage("Add a word"),
  check("question_4_word_3")
  .notEmpty().withMessage("Add a word"),
  check("question_4_word_4")
  .notEmpty().withMessage("Add a word"),


  validationMiddiel,
]

exports.create_post_comments_V = [
  check("comment")
  .notEmpty().whitelist("A comment must be added.")
  ,
  validationMiddiel,
]
























exports.deletePost_1_V = [
  check("id")
    .isMongoId()
    .withMessage("Post not found")
    .custom((val) =>
      Post.findById(val).then((post) => {
        if (!post) {
          throw new Error(`Post not found id: ${val}`);
        }
      })
    ),
  validationMiddiel,
];
