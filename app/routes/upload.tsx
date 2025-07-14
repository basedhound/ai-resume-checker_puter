import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/upload";
import FileUploader from "~/components/FileUploader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Upload Resume" },
    { name: "description", content: "Upload your resume to get feedback" },
  ];
}

const UploadPage = () => {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    console.log(companyName, jobTitle, jobDescription, file);
  };

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                  rows={5}
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Save & Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default UploadPage;
