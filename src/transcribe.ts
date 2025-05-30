import axios from "axios";
// import fs from "fs-extra";

const baseUrl = "https://api.assemblyai.com";
const API_KEY = "ba7248165d034c2ea98ff1fcb9f3bfc4"; // Troque se precisar

const headers = {
  authorization: API_KEY,
};

// Wrapping in async function
async function transcribeAudio(setState: any,url: string) {
  try {
    // ✅ Opção 1: usando um link direto (funciona)
    const audioUrl = url;

    // ✅ Opção 2: usando arquivo local — descomente se quiser testar localmente
    
    // const path = "./audio.mp3";
    // const audioData = await fs.readFile(path);
    // const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
    //   headers: {
    //     ...headers,
    //     "Content-Type": "application/octet-stream", // necessário!
    //   },
    // });
    // const audioUrl = uploadResponse.data.upload_url;
    

    // 🔁 Requisição de transcrição
    const data = {
      audio_url: audioUrl,
        "language_code": "pt",
      speech_model: "universal",
    };

    const transcriptResponse = await axios.post(`${baseUrl}/v2/transcript`, data, {
      headers: {
        ...headers,
        "Content-Type": "application/json", // obrigatório
      },
    });

    const transcriptId = transcriptResponse.data.id;
    const pollingEndpoint = `${baseUrl}/v2/transcript/${transcriptId}`;

    // ⏳ Loop de polling
    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, {
        headers,
      });

      const status = pollingResponse.data.status;

      if (status === "completed") {
        console.log("✅ Transcrição completa:");
        console.log(pollingResponse.data.text);
        setState(pollingResponse.data.text)
        break;
      } else if (status === "error") {
        console.error("❌ Erro na transcrição:", pollingResponse.data.error);
        break;
      } else {
        console.log("⏳ Aguardando...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }
    catch (err) {
     console.error("❌ Erro geral:", err);
   }
}
// transcribeAudio()
export default transcribeAudio