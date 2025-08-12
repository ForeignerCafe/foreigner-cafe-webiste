import ExperiencesClientPage from "./ExperiencesClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experiences | Foreigner Cafe",
  description:
    "Discover unique experiences and create lasting memories at Foreigner Cafe. From coffee tastings to special events, explore what makes us special.",
}

export default function ExperiencesPage() {
  return <ExperiencesClientPage />
}
