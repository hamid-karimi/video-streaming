import { useState } from "react";
import axios, { AxiosRequestConfig } from 'axios'

const VideoUpload = () => {
    const [file, setFile] = useState<File | undefined>();
    const [progress, setProgrees] = useState(0)
    const [error, setError] = useState<string | undefined>();
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        if(!file) return
        setSubmitting(true)

        formData.append("file", file!);

        const config: AxiosRequestConfig = {
            onUploadProgress: (e: ProgressEvent) => {
                const progress = Math.round((e.loaded * 100) / e.total);
                setProgrees(progress);
            }
        }
        try {
            const res = await axios.post("/api/videos", formData, config)
        } catch (err) {
           setError(err.message);
        }finally{
            setSubmitting(false)
            setProgrees(0)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setProgrees(0);
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            {submitting && <p>{progress}%</p>}
            <form onSubmit={handleSubmit} action="POST">
                <div>
                    <label htmlFor="file">File</label>
                    <input type="file" id="file" accept=".mp4" onChange={handleChange} />
                </div>
            </form>
            <button onClick={handleSubmit}>Upload Video</button>
        </div>
    )
};

export default VideoUpload;
