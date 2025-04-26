const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 1 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "require"],
    },

    slug: {
        type: String,
        lowercase: true,
    },

    profilImage: String,

    email: {
        type: String,
        require: [true, "require"],
        lowercase: true,
    },

    phone: String,

    password: {
        type: String,
        require: [true, "require"],
        minlemgth: [5, "minlemgth"]
    },

    password_Update_Time: Date,

    passwoedResetCode: String,

    passwoedResetCodeDate: Date,

    passwoedResetCodeVerified: Boolean,

    role: {
        type: String,
        enum: ["user", "admin", "employee"],
        default: "user",
    },

    active: {
        type: Boolean,
        default: true,
    },

    points: {
        type: Number,
        default: 20
    },

    friends: [{
        friend: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
    }],

    Friend_requests: [{
        friend: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
    }],

    verificationCode: { type: Number },

    // خاصية جديدة لحفظ جميع أنواع المنشورات
    savedPosts: [{
        post: {
            type: mongoose.Schema.ObjectId,
            refPath: "savedPosts.postModel"
        },
        postModel: {
            type: String,
            enum: ["post_1", "post_2", "post_3", "post_4", "post"] // الأنواع المدعومة من النماذج
        }
    }],

    solvedPost_2: [
        {
          postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post_2",
          },
          result: [
            {
              questionId: mongoose.Schema.Types.ObjectId,
              yourAnswer: String,
              correctAnswer: String,
              isCorrect: Boolean
            }
          ],
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],


    solvedPost_3: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post_3"
            },
            result: [
                {
                    questionId: mongoose.Schema.Types.ObjectId,
                    yourAnswer: Boolean,
                    correctAnswer: Boolean,
                    isCorrect: Boolean
                }
            ],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]


}, { timestamps: true })


const usermodel = mongoose.model("user", userSchema)

module.exports = usermodel