import { useEffect } from "react";
import { BiX } from "react-icons/bi"

interface Props {
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

const AlertError = ({isError,setIsError}:Props) => {

    useEffect(() => {
        if (isError) {
          setTimeout(() => {
            setIsError(false);
          }, 5000);
        }
      }, [isError]);

    return (
        <div className={`z-50 flex items-center gap-4 transition-all ease-in-out duration-1000     border-s-8 border-red-500 bg-white p-6 w-80  ${isError ? "right-8   " : "right-[-100%]"}   fixed bottom-8 shadow-md  `} >
            <BiX className="text-red-500 border-2 border-red-500 text-3xl rounded-full" />
            Ops! Algo deu errado!
        </div>
    )
}  

export default AlertError