import {getFunctions, httpsCallable} from 'firebase/functions';

const functions = getFunctions();

const generateUploadURL = httpsCallable(functions, 'generateUploadURL');

export async function uploadVideo(file: File) {
    // call generate upload url function with file name extension
    const response: any = await generateUploadURL({
        fileExtension: file.name.split('.').pop()
    })

    // upload file via signed URL
    // response? means only perform if response is defined
    await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    })
    return;

}