
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

const LoadingButton = () => {
    return (
        <Button disabled className="mt-4 flex items-center">
            <Loader2 className="mr-2 mt-4 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}

export default LoadingButton