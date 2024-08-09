import express from "express";

import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage"

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
    // Get bucket and filename from Cloud Pub/Sub message
    // not invoked by user, invoked by cloud pub/sub itself (which is invoked by upload)

    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error("Invalid message payload received");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send('Bad request: missing filename');
    }


    // Get path of the input video file from the request body data
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    // download raw video from cloud storage
    await downloadRawVideo(inputFileName);

    // process the video
    try {
        await convertVideo(inputFileName, outputFileName);
    } catch(err) {
        // need to delete raw vid from local if processing failed
        // AND delete "processed" vid from local... could be partially processed
        await Promise.all([             // using Promise.all allows 2 deletions to run in parallel... slightly more efficient
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ]);
        console.log(err)
        return res.status(500).send('Internal Server Error: video processing failed')
    }

    // upload processed video to cloud storage
    await uploadProcessedVideo(outputFileName);

    // need to delete raw vid from local if processing succeeded
    // AND delete processed vid from local
    await Promise.all([             // using Promise.all allows 2 deletions to run in parallel... slightly more efficient
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ]);

    return res.status(200).send("Processing finished successfully.")

    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(
        `video processing service listening at http://localhost:${port}`);
});