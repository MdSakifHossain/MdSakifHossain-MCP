// @ts-nocheck
import ProfileCard from "@/components/my-comps/ProfileCard"
import { config } from "@/constants/index"

const HomePage = () => {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <ProfileCard config={config} />
    </main>
  )
}

export default HomePage
