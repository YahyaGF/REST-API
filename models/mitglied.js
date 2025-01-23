const mongoose = require('mongoose')


const MitgliedSchema = new mongoose.Schema ({

      name:{
            type: String,
            required: true         
      },
      verein:{
            type: String,
            required: true  
      },

      BeitrittsDatum: {
            type: Date,
            required: true,  
            default: Date.now
      }, 
})

module.exports = mongoose.model('Mitglieder', MitgliedSchema)