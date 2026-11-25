import { Button } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-svh items-center justify-center gap-8">
      <img src="/oops.svg" alt="404" className="w-2/12" />
      <Button size={"lg"} onClick={() => navigate(-1)}>
        <IconArrowLeft /> Go Back
      </Button>
    </main>
  )
}

export default NotFoundPage
