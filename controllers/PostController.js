import postModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'post error'});
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
                _id: postId,

            }, {
                $inc: {viewsCount: 1},
            }, {
                returnDocument: 'after'
            }, (err, doc) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({message: 'post error returne'});
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'probelm'
                    })

                }
                res.json(doc)
            }
        )

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'post error'});
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
                _id: postId,


            }, (err, doc) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({message: 'post error delete'});
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'probelm'
                    })

                }
                res.json({
                    success: true,
                })
            }
        )

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'post error'});
    }
}

export const create = async (req, res) => {
    try {
        const doc = new postModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,

        })
        const post = await doc.seve()
        res.json(post)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'post err'});
    }
}

export const update = async (req, res) => {
    try {
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tagy,
        })
        res.json({
            success: true
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'post err'});
    }
}
