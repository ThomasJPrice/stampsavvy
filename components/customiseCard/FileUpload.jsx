import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-uploader";
import { CloudUpload, Paperclip } from "lucide-react";
import toast from "react-hot-toast";
import { useField } from "formik";

const FileUpload = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { value } = field;
  const { setValue } = helpers;

  const [files, setFiles] = useState([value]);

  const handleFileUpload = (file) => {
    setValue(file)
    setFiles(file)
  }

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4, // 4MB
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    excludeAcceptAllOption: true,
    onDropRejected: () => toast.error('Error: Only PNG and JPG files are accepted.'),
  };

  return (
    <div className="mt-2">
      <Label>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</Label>

      <FileUploader
        value={files}
        onValueChange={handleFileUpload}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-md mt-1"
      >
        <FileInput className="border border-dashed border-gray-500">
          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full text-sm">
            <CloudUpload className="w-8 h-8 mb-1 text-primary" />

            <div className="text-center text-primary">
              <p><strong className="font-semibold">Click to upload</strong> or drag and drop</p>
              <p>PNG or JPG</p>
            </div>
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i} className="hover:bg-none">
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>
    </div>
  );
};

export default FileUpload;
