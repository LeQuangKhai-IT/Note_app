import mongoose from 'mongoose'
//Schema Note app
const noteSchema = new mongoose.Schema({
    check:{ type:  Boolean},
    title : String,
    content: String,
  })
  const Note = mongoose.model('Note',noteSchema);

  // 
