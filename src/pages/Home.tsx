import ResumeUpload from '../components/ResumeUpload';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Find Your Perfect Job Match</h1>
      <p className="text-lg mb-6">Upload your resume, and we'll match you with jobs.</p>
      <ResumeUpload />
    </div>
  );
};

export default Home;
