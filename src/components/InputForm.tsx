import { LuFileAudio2, LuFileVideo } from "react-icons/lu"
import { MdOutlineFileUpload } from "react-icons/md"

import transcribe from ".././transcribe";
// import audio from "./audio.mp3";
import axios from "axios";
import type { SetStateAction } from "react";

const baseUrl = "https://api.assemblyai.com";
const API_KEY = "ba7248165d034c2ea98ff1fcb9f3bfc4"; // Troque se necessário

const headers = {
  authorization: API_KEY,
};

type Props = {
    setTranscript: React.Dispatch<SetStateAction<string | null>>;
    setFile: React.Dispatch<React.SetStateAction<File| null> | null>;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
  };

const InputForm = ({setTranscript,setFile,setIsError}:Props) => {

    const formatar = async (audio: string) => {
        try {
          const response = await fetch(audio);
          const audioBlob = await response.blob();
      
          const uploadResponse = await axios.post(
            `${baseUrl}/v2/upload`,
            audioBlob,
            {
              headers: {
                ...headers,
                "Content-Type": "application/octet-stream",
              },
            }
          );
      
          const url = uploadResponse.data.upload_url;
          transcribe(setTranscript, url); // ✅ Passar a URL diretamente
        } catch (error) {
          setIsError(true)
          console.error("Erro ao fazer upload do áudio:", error);
          setTimeout(() => {
            setFile(null)
          }, 5000);
        }
      };
      

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file)
    const url = URL.createObjectURL(file);
    formatar(url);
  };
  
    return (
        <>
        <div className="w-11/12 lg:w-9/12 p-6 border border-neutral-300 mx-auto rounded-lg ">
          <div className="border-dashed group border-2 transition-all duration-300  hover:border-blue-800 hover:bg-gray-500/5 rounded-xl  lg:h-96   border-neutral-300 flex flex-col items-center py-8 gap-4">
            <MdOutlineFileUpload className="p-2 rounded-full bg-blue-400/20 text-7xl text-blue-800" />
            <h2 className="text-lg w-8/12 text-center lg:w-full">Arraste e solte seu arquivo aqui</h2>
            <p className="w-6/12 text-center px-3  text-neutral-400">
              Suporta áudios (MP3, WAV, OGG) e vídeos (MP4, WebM) com até 100MB
            </p>
            <div className="flex gap-4 my-3 flex-col lg:flex-row" >
              <div className="flex gap-2 items-center bg-blue-400/10 p-2 rounded-md px-4  text-sm text-black/90 ">
                <LuFileAudio2 className="text-xl text-blue-800" />
                Audio
              </div>

              <div className="flex gap-2 items-center bg-blue-400/10 p-2 rounded-md px-4  text-sm text-black/90 ">
                <LuFileVideo className="text-xl text-blue-800"/>


                Video
              </div>
            </div>
            <label htmlFor="audio" className="cursor-pointer bg-blue-700/90 text-white px-4 py-2 mt-2 rounded-md" >Selecione o arquivo</label>
          </div>
        </div>
        <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
            placeholder="Selecione um áudio"
            id="audio"
            className="hidden"
          />
        </>
    )
}

export default InputForm