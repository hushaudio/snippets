exports.getVideoStream = (req, res, next) => {
  mongodb.MongoClient.connect(url, function (error, client) {
    if (error) {
      res.status(500).json(error);
      return;
    }

    // Check for range headers to find our start time
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const db = client.db('videos');
    // GridFS Collection
    console.log(req.params.id);
    db.collection('videos.files').findOne({_id:mongoose.Types.ObjectId(req.params.id)}, (err, video) => {
      if (!video) {
        res.status(404).send("No video uploaded!");
        return;
      }
      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // Get the bucket and download stream from GridFS
      const bucket = new mongodb.GridFSBucket(db,{bucketName:"videos"});
      
      const downloadStream = bucket.openDownloadStream(video._id, {
        start:start,
        end:end
      });

      // Finally pipe video to response
      console.log(streamCounter," start ",start," end ",end)
      streamCounter++;
      downloadStream.pipe(res);
    });
  });
  
};
