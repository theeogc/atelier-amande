import { NotFoundContent } from "@/components/not-found-content"

export const metadata = {
  title: "404 — Page introuvable",
  description: "Cette page n'existe pas. Retournez à l'accueil de L'Atelier d'Amande.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundContent />
}
