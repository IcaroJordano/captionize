import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import PreviewFile from "./components/PreviewFile";
import Transcribe from "./components/Transcribe";
import AlertError from "./components/AlertError";


const App = () => {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);
  

  useEffect(() => {
    console.log(file)
  }, [file]);


  return (
    <div className=" lg:p-4 lg:pt-8  bg-neutral-100">
      <div className="bg-white rounded-md min-h-screen">
        <div className=" p-4 lg:w-1/2 mx-auto py-8">
          <h1 className="text-4xl text-blue-700  font-bold text-center mb-4">
            Captionize...
          </h1>
          <p className="p-2 lg:p-0 text-center text-neutral-400">
            Transforme áudio e vídeo em texto sincronizado automaticamente
          </p>
        </div>
        {file===null ?
        <InputForm setIsError={setIsError} setFile={setFile} setTranscript={setTranscript} />
        :<div className="lg:w-9/12 w-11/12 mx-auto flex gap-6 lg:flex-row flex-col">
          <PreviewFile setTrancript={setTranscript} setFile={setFile} file={file} />
          <Transcribe transcript={transcript} />
        </div>}
        
      </div>
      <AlertError setIsError={setIsError} isError={isError} /> 
    </div>
  );
};

export default App;
