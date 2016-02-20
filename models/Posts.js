var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: { type: Number, default: 0},
	commments: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

//add a method to the PostShema to allow upvotes and save them
PostSchema.methods.upvote = function(callback) {
	this.upvotes += 1;
	this.save(callback);
}

mongoose.model('Post', PostSchema);
