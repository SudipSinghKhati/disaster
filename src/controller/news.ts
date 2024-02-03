
import News from '../models/news'
import asyncHandler from "../middleware/async";


const getAllNews = asyncHandler(async (req: any, res: { json: (arg0: { data: any; }) => void; }) => {
    try {
        const news = await News.find();
        res.json({ data: news });
    }
    catch (error) {
        console.log(error);
    }
});
const createANews = (req:any, res:any, next:any) => {

    const newNews = {
        ...req.body,
        user: req.user.id
    }

    console.log(newNews)


    News.create(newNews)
        .then(news => res.status(201).json(news))
        .catch(next)


}



const getNewsById = (req:any, res:any, next:any) => {
    News.findById(req.params.news_id)
        .then(news => {
            if (!news) {
                res.status(404).json({ error: "News Not Found" })
            }
            res.json({data: news});
        })
        .catch(next);
}

const getAllMyNews = (req:any, res:any, next:any) => {
    News.find({user: req.user.id})
    .then(news => {
        if(!news){
            res.status(404).json({error: "You haven't added any news"})
        }
        res.json({data: news})
    })
    .catch(next);

}
const updateNews = (req:any, res:any, next:any) => {
    News.findByIdAndUpdate(
        req.params.news_id,
        { $set: req.body },
        { new: true }
    )
        .then(updatedRoom => res.status(200).json(updatedRoom))
        .catch(next)
}

const deleteNewsById = async(req:any, res:any, next:any) => {
    await News.findByIdAndDelete(req.params.news_id).then((news) => {
        if (!news) {
          return res
            .status(404)
            .json({ message: "News not found with id of ${req.params.id}" });
        }
        res.status(200).json({data: news });
      });
    };

const uploadImage = asyncHandler(async (req: { params: { postId: any; }; file: { filename: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): any; new(): any; }; json: { (arg0: { success?: boolean; data?: any; error?: any; }): void; new(): any; }; }; send: (arg0: { error: any; }) => any; }, next: any) => {
    const postId = req.params.postId;
    News.findById(postId)
        .then((news: any) => {
            console.log(news);
            if (!req.file) {
                return res.status(400).send({ message: "Please upload a file" });
            }
            const imageName = req.file.filename
            News.findByIdAndUpdate(
                postId,
                { $set: { image: imageName } },
                { new: true }
            )
                .then((success: any) => {
                    res.status(200).json({
                        success: true,
                        data: req.file.filename,
                    });
                })
                .catch((error: { message: any; }) => res.status(500).json({ error: error.message }))

        })
        .catch((error: { message: any; }) => res.send({ error: error.message }))

});


export = {
    getAllMyNews,
    getAllNews,
    getNewsById,
    deleteNewsById,
    updateNews,
    uploadImage,
    createANews,
}