import { useEffect, useState } from "react";
import { GoDownload } from "react-icons/go";
import { IoCopyOutline } from "react-icons/io5";

interface Props {
  transcript: string | null;
}

const Transcribe = ({ transcript }: Props) => {
  const [paragrafos, setParagrafos] = useState<string[]>([]);

  useEffect(() => {
    const lista = transcript?.match(/([A-Z][^A-Z]*)/g);
    if (lista) {
      setParagrafos(lista);
    } else {
      setParagrafos([]);
    }
    console.log(lista);
  }, [transcript]);
  const handleDownload = () => {
    const blob = new Blob([transcript!], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "texto-formatado.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copia o texto para a área de transferência
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcript!);
      alert("Texto copiado!");
    } catch (err) {
      alert("Erro ao copiar.");
    }
  };


  

  return (
    <div className="border rounded-lg border-neutral-200  p-6  ">
      <div className="flex lg:gap-48 flex-col lg:flex-row ">
        <h3>Transcrição</h3>
        <div className="flex gap-2  mt-4 lg:mt-0">
          <button onClick={handleDownload} className="border text-xs cursor-pointer p-1 px-3 gap-2 items-center justify-around rounded-md flex border-neutral-200">
            <GoDownload className=" text-base" />
            .TXT
          </button>
          <button onClick={handleCopy} className="border text-xs cursor-pointer p-1 px-3 gap-2 items-center justify-around rounded-md flex border-neutral-200">
            <IoCopyOutline className=" " />
            COPY
          </button>
        </div>
      </div>
      <div
        style={{overflowY: 'scroll',
          paddingRight: '8px', 
          scrollbarWidth: 'thin',
        }}
      className="mt-8 gap-4 flex flex-col max-h-96 overflow-y-auto">
        {paragrafos.map((paragrafo, index) => (
          <div
            key={index}
            className=" border-neutral-300 border p-4 text-sm rounded-md"
          >
            <div className="flex justify-between mb-2 text-neutral-400">
              <span>00:00</span>
              <span>00:00</span>
            </div>
            {paragrafo}
          </div>
        ))}
        {paragrafos.length === 0 && (
          <>
            <div className="bg-neutral-300 p-4 py-12 animate-pulse text-sm rounded-md"></div>
            <div className="bg-neutral-300 p-4 py-12 animate-pulse text-sm rounded-md"></div>
            <div className="bg-neutral-300 p-4 py-12 animate-pulse text-sm rounded-md"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transcribe;
