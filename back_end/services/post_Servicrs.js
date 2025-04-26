const Post_1 = require("../models/post_1_Models");
const Post_2 = require("../models/post_2_Models");
const Post_3 = require("../models/post_3_Models");
const Post_4 = require("../models/post_4_Models");
const Post = require("../models/post_Models");
const User = require("../models/userModels");
const ApiError = require("../ApiError");

const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const multerStorage = multer.memoryStorage();

const fs = require("fs");

fs.writeFile("example.txt", "Hello World!", (err) => {
  if (err) throw err;
  console.log("File created successfully!");
});



const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new ApiError("The uploaded file is not an image or a video", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).fields([
  { name: "postImage_1", maxCount: 1 },
  { name: "postImage_2", maxCount: 1 },
  { name: "postImage_3", maxCount: 1 },
  { name: "postImage_4", maxCount: 1 },
  { name: "postImage_5", maxCount: 1 },
  { name: "question_1_img", maxCount: 1 },
  { name: "question_2_img", maxCount: 1 },
  { name: "question_3_img", maxCount: 1 },
  { name: "question_4_img", maxCount: 1 },
  { name: "img_post", maxCount: 1 },
  { name: "video_post", maxCount: 1 },
]);


exports.resizeVideo_video_post = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.video_post) {
    const file = req.files.video_post[0];
    const filename = `postVideo_1-${uuidv4()}-${Date.now()}.mp4`;
    const filePath = `videos/posts/${filename}`;

    // حفظ الفيديو
    await fs.promises.writeFile(filePath, file.buffer);

    req.body.video_post = filename;
  }
  next();
});

// تستخدم .fields لذا احذف imgcompany و imgcompanyLogo
exports.uploadImages = upload;


exports.resizeImg_post_img = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.img_post) {
    const file = req.files.img_post[0]; // يأخذ أول ملف في المصفوفة
    const filename = `img_post-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.img_post = filename;
  }
  next();
});

exports.resizeImg_postImage_1 = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.postImage_1) {
    const file = req.files.postImage_1[0]; // يأخذ أول ملف في المصفوفة
    const filename = `postImage_1-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.postImage_1 = filename;
  }
  next();
});
exports.resizeImg_postImage_2 = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.postImage_2) {
    const file = req.files.postImage_2[0]; // يأخذ أول ملف في المصفوفة
    const filename = `postImage_2-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.postImage_2 = filename;
  }
  next();
});
exports.resizeImg_postImage_3 = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.postImage_3) {
    const file = req.files.postImage_3[0]; // يأخذ أول ملف في المصفوفة
    const filename = `postImage_3-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.postImage_3 = filename;
  }
  next();
});
exports.resizeImg_postImage_4 = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.postImage_4) {
    const file = req.files.postImage_4[0]; // يأخذ أول ملف في المصفوفة
    const filename = `postImage_4-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.postImage_4 = filename;
  }
  next();
});
exports.resizeImg_postImage_5 = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.postImage_5) {
    const file = req.files.postImage_5[0]; // يأخذ أول ملف في المصفوفة
    const filename = `postImage_5-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.postImage_5 = filename;
  }
  next();
});

// ============================================================

exports.resizeImg_question_1_img = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.question_1_img) {
    const file = req.files.question_1_img[0]; // يأخذ أول ملف في المصفوفة
    const filename = `question_1_img-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.question_1_img = filename;
  }
  next();
});
exports.resizeImg_question_2_img = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.question_2_img) {
    const file = req.files.question_2_img[0]; // يأخذ أول ملف في المصفوفة
    const filename = `question_2_img-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.question_2_img = filename;
  }
  next();
});
exports.resizeImg_question_3_img = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.question_3_img) {
    const file = req.files.question_3_img[0]; // يأخذ أول ملف في المصفوفة
    const filename = `question_3_img-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.question_3_img = filename;
  }
  next();
});
exports.resizeImg_question_4_img = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.question_4_img) {
    const file = req.files.question_4_img[0]; // يأخذ أول ملف في المصفوفة
    const filename = `question_4_img-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`image/posts/${filename}`);

    req.body.question_4_img = filename;
  }
  next();
});

// =========================================================================


exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create({
    user: req.user._id,
    writing : req.body.writing,
    img_post: req.body.img_post,
    video_post : req.body.video_post
  });

  res.status(200).json({ data: post });
})

// =================================================


exports.createPost_1 = asyncHandler(async (req, res, next) => {
  const post = await Post_1.create({
    user: req.user._id,
    box1: {
      postImage_1: req.body.postImage_1,
      word_1: req.body.word_1,
    },
    box2: {
      postImage_2: req.body.postImage_2,
      word_2: req.body.word_2,
    },
    box3: {
      postImage_3: req.body.postImage_3,
      word_3: req.body.word_3,
    },
    box4: {
      postImage_4: req.body.postImage_4,
      word_4: req.body.word_4,
    },
    box5: {
      postImage_5: req.body.postImage_5,
      word_5: req.body.word_5,
    },
  });

  res.status(200).json({ data: post });
});

// ======================================================================

exports.createPost_2 = asyncHandler(async (req, res, next) => {
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "يجب إرسال أسئلة." });
  }

  const post = await Post_2.create({
    user: req.user._id,
    questions: questions.map(q => ({
      question: q.question,
      Answer_1: q.Answer_1,
      Answer_2: q.Answer_2,
      Answer_3: q.Answer_3,
      Answer_4: q.Answer_4,
      Answer_4: q.Answer_4,
      correctAnswer: q.correctAnswer,
    })),
  });

  res.status(200).json({ data: post });
});


exports.checkPost_2 = asyncHandler(async (req, res, next) => {
  const { postId, answers } = req.body;

  const post = await Post_2.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "البوست غير موجود" });
  }

  const questions = post.questions;

  const questionMap = {};
  questions.forEach(q => {
    questionMap[q._id.toString()] = q;
  });

  const result = answers.map((ans) => {
    const question = questionMap[ans.questionId];
    if (!question) {
      return {
        questionId: ans.questionId,
        error: "السؤال غير موجود في هذا البوست"
      };
    }

    return {
      questionId: question._id,
      yourAnswer: ans.answer,
      correctAnswer: question.correctAnswer, // ✅ سؤال ببوست 2 بيحمل حقل correctAnswer
      isCorrect: question.correctAnswer === ans.answer
    };
  });

  // ✅ تحديث أو إضافة داخل User (مثل checkPost_3)
  const user = await User.findById(req.user._id);

  const existingAttempt = user.solvedPost_2.find(
    (attempt) => attempt.postId.toString() === postId
  );

  if (existingAttempt) {
    // حدث المحاولة القديمة
    result.forEach((newAnswer) => {
      const existingIndex = existingAttempt.result.findIndex(
        (r) => r.questionId.toString() === newAnswer.questionId.toString()
      );

      if (existingIndex !== -1) {
        // حدث الإجابة
        existingAttempt.result[existingIndex] = newAnswer;
      } else {
        // أضف إجابة جديدة
        existingAttempt.result.push(newAnswer);
      }
    });
  } else {
    // ما في محاولة قديمة، أضف جديدة
    user.solvedPost_2.push({
      postId: post._id,
      result: result
    });
  }

  await user.save();

  res.status(200).json({
    postId,
    result
  });
});





//==========================================================================

exports.createPost_3 = asyncHandler(async (req, res, next) => {
  const post = await Post_3.create({
    user: req.user._id, // المستخدم الحالي

    // ✅ بدل الأسئلة الثابتة، صرنا ناخد كل الأسئلة من المصفوفة:
    questions: req.body.questions, // لازم تكون مصفوفة فيها عناصر مثل: { question, condition }

    // 👍 باقي العناصر مثل ما هي:
    likes: req.body.likes || [],
    comments: req.body.comments || [],
  });

  res.status(200).json({ data: post }); // إرسال الاستجابة
});


exports.chickPost_3 = asyncHandler(async (req, res, next) => {
  const { postId, answers } = req.body;

  const post = await Post_3.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "البوست غير موجود" });
  }

  const questions = post.questions;

  const questionMap = {};
  questions.forEach(q => {
    questionMap[q._id.toString()] = q;
  });

  const result = answers.map((ans) => {
    const question = questionMap[ans.questionId];
    if (!question) {
      return {
        questionId: ans.questionId,
        error: "السؤال غير موجود في هذا البوست"
      };
    }

    return {
      questionId: question._id,
      yourAnswer: ans.answer,
      correctAnswer: question.condition,
      isCorrect: ans.answer === question.condition
    };
  });

  // ✅ تحديث أو إضافة داخل User
  const user = await User.findById(req.user._id);

  const existingAttempt = user.solvedPost_3.find(
    (attempt) => attempt.postId.toString() === postId
  );

  if (existingAttempt) {
    // تحديث الأسئلة فقط، دون حذف القديم
    result.forEach((newAnswer) => {
      const existingIndex = existingAttempt.result.findIndex(
        (r) => r.questionId.toString() === newAnswer.questionId.toString()
      );

      if (existingIndex !== -1) {
        // حدث الإجابة القديمة
        existingAttempt.result[existingIndex] = newAnswer;
      } else {
        // أضف إجابة جديدة
        existingAttempt.result.push(newAnswer);
      }
    });
  } else {
    // أول مرة، أضف محاولة جديدة
    user.solvedPost_3.push({
      postId: post._id,
      result: result
    });
  }

  await user.save();

  res.status(200).json({
    postId,
    result
  });
});




// ==================================================================

exports.createPost_4 = asyncHandler(async (req, res, next) =>{
  const post = await Post_4.create({
    user: req.user._id,
    question_1_img : req.body.question_1_img,
    question_1_word_1 : req.body.question_1_word_1,
    question_1_word_2 : req.body. question_1_word_2,
    question_1_word_3 : req.body. question_1_word_3,
    question_1_word_4 : req.body. question_1_word_4,
    
    question_2_img : req.body.question_2_img,
    question_2_word_1 : req.body.question_2_word_1,
    question_2_word_2 : req.body. question_2_word_2,
    question_2_word_3 : req.body. question_2_word_3,
    question_2_word_4 : req.body. question_2_word_4,

    question_3_img : req.body.question_3_img,
    question_3_word_1 : req.body.question_3_word_1,
    question_3_word_2 : req.body. question_3_word_2,
    question_3_word_3 : req.body. question_3_word_3,
    question_3_word_4 : req.body. question_3_word_4,

    question_4_img : req.body.question_4_img,
    question_4_word_1 : req.body.question_4_word_1,
    question_4_word_2 : req.body. question_4_word_2,
    question_4_word_3 : req.body. question_4_word_3,
    question_4_word_4 : req.body. question_4_word_4,
  });

  res.status(200).json({ data: post });


})


// ===================================================================


exports.getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    // جلب جميع البوستات من جميع السكيمات
    const posts1 = await Post_1.find().populate('user').populate('comments.user_comment');
    const posts2 = await Post_2.find().populate('user').populate('comments.user_comment');
    const posts3 = await Post_3.find().populate('user').populate('comments.user_comment');
    const posts4 = await Post_4.find().populate('user').populate('comments.user_comment');
    const posts = await Post.find().populate('user').populate('comments.user_comment');
    

    // دمج جميع البوستات في مصفوفة واحدة
    let allPosts = [
      ...posts1,
      ...posts2,
      ...posts3,
      ...posts4,
      ...posts,
    ];

    // فرز البوستات حسب تاريخ الإنشاء من الأحدث إلى الأقدم
    allPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);

    // إرسال البيانات كاستجابة
    res.status(200).json({ data: allPosts });
  } catch (error) {
    next(error); // في حالة وجود خطأ، يتم تمرير الخطأ إلى Middleware للمعالجة
  }
});


// =======================================================================

exports.getUserPosts = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.userId; // جلب معرف المستخدم من الطلب

    // جلب البوستات لكل سكيمة بناءً على معرف المستخدم
    const posts1 = await Post_1.find({ user: userId });
    const posts2 = await Post_2.find({ user: userId });
    const posts3 = await Post_3.find({ user: userId });
    const posts4 = await Post_4.find({ user: userId });
    const posts = await Post.find({ user: userId });

    // دمج جميع البوستات في مصفوفة واحدة
    let userPosts = [
      ...posts1,
      ...posts2,
      ...posts3,
      ...posts4,
      ...posts,
    ];

    // فرز البوستات حسب تاريخ الإنشاء من الأحدث إلى الأقدم
    userPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);

    // إرسال البيانات كاستجابة
    res.status(200).json({ data: userPosts });
  } catch (error) {
    next(error); // معالجة أي خطأ وتمريره إلى الـ Middleware
  }
});


// =======================================================================

exports.deletePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // قراءة الـid من البرامس (params)
    let post;
    let schema;

    // البحث عن البوست في كل السكيمات
    post = await Post_1.findById(id);
    if (post) schema = "Post_1";

    if (!post) {
      post = await Post_2.findById(id);
      if (post) schema = "Post_2";
    }

    if (!post) {
      post = await Post_3.findById(id);
      if (post) schema = "Post_3";
    }

    if (!post) {
      post = await Post_4.findById(id);
      if (post) schema = "Post_4";
    }

    if (!post) {
      post = await Post.findById(id);
      if (post) schema = "post";
    }

    // التحقق من وجود البوست
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // التحقق من أن المستخدم الحالي هو نفس الذي أنشأ البوست
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not have permission to delete this post." });
    }

    // حذف البوست
    await post.deleteOne();

    res.status(200).json({
      message: "Post has been successfully deleted.",
      schema, // إرسال اسم السكيمة للتأكيد
    });
  } catch (error) {
    next(error); // في حالة وجود خطأ، يتم تمرير الخطأ إلى Middleware للمعالجة
  }
});


// =================================================================


const schemas = [Post_1, Post_2, Post_3, Post_4, Post]; // جميع السكيمات مجمعة في مصفوفة

exports.create_post_comments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  // التحقق من وجود التعليق
  if (!req.body.comment) {
    return next(new ApiError("يجب كتابة تعليق صالح.", 400));
  }

  let postFound = null;
  let schemaUsed = null;

  // البحث عن البوست في جميع السكيمات
  for (const schema of schemas) {
    postFound = await schema.findById(id);
    if (postFound) {
      schemaUsed = schema;
      break;
    }
  }

  if (!postFound) {
    return next(new ApiError(`لا يوجد بوست بهذا المعرف ${id}.`, 404));
  }

  // استخدام push لإضافة التعليق ثم الحفظ
  postFound.comments.push({
    comment: req.body.comment,
    user_comment: userId,
  });

  await postFound.save();

  res.status(200).json({ data: postFound }); // الرد بعد التحديث
});




// ================================================================================

// const schemas = [Post_1, Post_2, Post_3, Post_4]; // جميع السكيمات مجمعة في مصفوفة

exports.toggle_post_like = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // معرف البوست
  const userId = req.user._id; // معرف المستخدم

  let postFound = null; // لتخزين البوست الذي يتم العثور عليه
  let schemaUsed = null; // لتحديد السكيمة المستخدمة

  // البحث بالتسلسل في جميع السكيمات
  for (const schema of schemas) {
    postFound = await schema.findById(id);
    if (postFound) {
      schemaUsed = schema; // تحديد السكيمة التي تم العثور فيها على البوست
      break;
    }
  }

  if (!postFound) {
    return next(new ApiError(`لا توجد مشاركة بهذا الرقم ${id}.`, 404)); // إذا لم يتم العثور على البوست
  }

  // التحقق إذا كان "likes" يحتوي على المستخدم الحالي
  if (!Array.isArray(postFound.likes)) {
    postFound.likes = []; // تهيئة الحقل كمصفوفة إذا لم يكن موجودًا أو معرفًا بشكل صحيح
  }

  const userLikeIndex = postFound.likes.findIndex((like) => like.toString() === userId.toString());

  if (userLikeIndex === -1) {
    // إضافة إعجاب إذا لم يكن موجودًا
    postFound.likes.push(userId);
  } else {
    // إزالة الإعجاب إذا كان موجودًا
    postFound.likes.splice(userLikeIndex, 1);
  }

  // حفظ التغييرات
  await postFound.save();

  res.status(200).json({ data: postFound }); // رد النجاح مع البيانات المحدثة
});