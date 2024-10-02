"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import toast from "react-hot-toast";

interface FileUploadProps {
   onChange: (url?: string) => void;
   endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    return (
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            console.log("File Upload Complete", res);
            // alert("Upload Complete");
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            console.log(`ERROR! ${error.message}`);
            toast.error(`ERROR! ${error.message}`);
        }}
        />
    )
}