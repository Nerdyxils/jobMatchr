import { useState } from 'react';

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Call API to handle resume upload and parsing
      console.log('File submitted:', file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".pdf,.docx" 
        onChange={handleFileChange} 
        className="mb-4"
      />
      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default ResumeUpload;
