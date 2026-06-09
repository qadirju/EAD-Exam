import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a subject name'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Please provide a subject code'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    instructor: {
      type: String,
      trim: true
    },
    credits: {
      type: Number,
      min: 1,
      max: 4
    },
    color: {
      type: String,
      default: '#5568ff'
    }
  },
  { timestamps: true }
)

const Subject = mongoose.model('Subject', subjectSchema)
export default Subject
