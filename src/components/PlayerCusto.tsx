import { useEffect, useRef, useState } from "react";
import { BiPlay, BiPause } from "react-icons/bi";

interface Props {
  audioURL: string;
}

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const PlayerCustom = ({ audioURL }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 rounded-lg  bg-white">
      <audio ref={audioRef} src={audioURL} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="text-2xl p-1 border-2 border-neutral-200 rounded-sm text-neutral-600 hover:text-black"
        >
          {isPlaying ? <BiPause /> : <BiPlay />}
        </button>


        <div className="text-xs text-neutral-500 flex justify-between">
        <span>{formatTime(currentTime)}</span>
          </div>
        <div className="flex flex-col flex-1">
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
          <div className="text-xs text-neutral-500 flex justify-between">
            <span>{formatTime(duration)}</span>
          </div>
      </div>
    </div>
  );
};

export default PlayerCustom;
