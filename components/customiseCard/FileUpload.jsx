import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label"
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-uploader";
import { CloudUpload, Paperclip } from "lucide-react";

const FileUpload = ({ formData, setFormData }) => {
  const [files, setFiles] = useState(null)

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  return (
    <div className="mt-2">
      <Label>Logo</Label>

      <FileUploader
        value={files}
        onValueChange={(e) => console.log(e)}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-md mt-1"
      >
        <FileInput className="border border-dashed border-gray-500">
          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full text-sm">
            <CloudUpload className="w-8 h-8 mb-1" />

            <div className="text-center">
              <p><strong className="font-semibold">Click to upload</strong> or drag and drop</p>
              <p>PNG or JPG</p>
            </div>
          </div>
        </FileInput>
        <FileUploaderContent className="">
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i} className='hover:bg-none'>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>

    </div>
  )
}

export default FileUpload