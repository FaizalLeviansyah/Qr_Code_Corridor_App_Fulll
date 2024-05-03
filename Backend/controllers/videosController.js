import fs from "fs";
import path from "path";
import Videos from "../models/videosModel.js";

export const getVideos = async(req, res)=>{
    try {
        const response = await Videos.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getVideosById = async(req, res)=>{
    try {
        const response = await Videos.findOne({
            where: {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveVideos = (req, res)=>{
    if (req.files == null) return res.status(400).json({msg: "No File Upload"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`;
    const allowedType = ['.mp4', '.avi', '.mov'];
    
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Video"});
    if (fileSize > 100000000) return res.status(422).json({msg: "Video must be less than 100 MB"});
    if (!req.admin) return res.status(401).json({ msg: "Unauthorized" });

    file.mv(`./public/videos/new/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Videos.create({name: name, videos: fileName, url: url});
            res.status(201).json({msg: "Video Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateVideos = async(req, res)=>{
    const videos = await Videos.findOne({
        where:{
            id : req.params.id
        }
    });
    if (!videos) return res.status(404).json({msg: "Data Not Found"});
    if (!req.admin) return res.status(401).json({ msg: "Unauthorized" });
    let fileName = "";
    if (req.files === null) {
        fileName = videos.videos;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.mp4','.avi','.mov'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Video"});
        if(fileSize > 10000000) return res.status(422).json({msg: "Video must be less than 100 MB"});

        const filepath = `./public/videos/new/${videos.videos}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/videos/new/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`; 
    
    try {
        await videos.update({name: name, videos: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Video Updated Successfuly"});
    } catch (error) {clearScreenDown
        console.log(error.message);
    }
}

export const deleteVideos = async(req, res)=>{
    const videos = await Videos.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!videos) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/videos/new/${videos.videos}`;
        fs.unlinkSync(filepath);
        await Videos.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Video Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}