import { useEffect, useState, type SetStateAction } from "react";
import PlayerCustom from "./PlayerCusto";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null> | null>;
  setTrancript: React.Dispatch<SetStateAction<string | null>>;
}
const PreviewFile = ({ file, setFile, setTrancript }: Props) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    }
  }, [file]);

  return (
    <div>
      <div className="border rounded-lg border-neutral-200  p-6   ">
        {/* <h2 className="text-lg  line-clamp-2"  >{file?.name }</h2> */}
        <h2 className="text-lg  line-clamp-2">
          {file instanceof Blob ? file.name : ""}
        </h2>
        <div className="lg:w-[424px] w-full   mt-4">

        <PlayerCustom audioURL={audioURL!} />
        </div>
      </div>
      <button
        onClick={() => {
          setTrancript(null);
          setFile(null);
        }}
        className="text-neutral-500 underline mt-4 text-sm underline-offset-4 cursor-pointer"
      >
        Processar outro arquivo
      </button>
    </div>
  );
};

export default PreviewFile;
