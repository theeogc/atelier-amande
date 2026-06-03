import Link from "next/link"

export const metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de L'Atelier d'Amande, prothésiste ongulaire à Marcellaz (74250). Éditeur, hébergement, données personnelles et cookies.",
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F3] py-24">
      <div className="container mx-auto px-6 max-w-3xl">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#B08060] text-sm mb-10 hover:underline"
        >
          ← Retour au site
        </Link>

        <h1 className="font-serif text-4xl text-[#3A2A1E] mb-4">Mentions légales</h1>
        <p className="text-[#8A7A6E] italic mb-12" style={{ fontFamily: "var(--font-cormorant)" }}>
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
        </p>

        <div className="space-y-10 text-[#3A2A1E]">

          <section>
            <h2 className="font-serif text-2xl mb-3">1. Éditeur du site</h2>
            <div className="text-[#6B5A4E] leading-relaxed space-y-1">
              <p><strong>Nom :</strong> Mme Goncalves Amanda</p>
              <p><strong>Activité :</strong> Prothésiste ongulaire</p>
              <p><strong>Adresse :</strong> 217 Route de la Vieille Verne, 74250 Marcellaz, Haute-Savoie</p>
              <p><strong>Téléphone :</strong> 06 69 03 69 84</p>
              <p><strong>Email :</strong> latelierdamande74@gmail.com</p>
              <p><strong>Numéro SIRET :</strong> 848 725 909 00024</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3">2. Hébergement</h2>
            <div className="text-[#6B5A4E] leading-relaxed space-y-1">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              <p><strong>Site :</strong> vercel.com</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3">3. Propriété intellectuelle</h2>
            <p className="text-[#6B5A4E] leading-relaxed">
              L'ensemble des contenus présents sur ce site (textes, images, photos, logos) est la propriété exclusive de L'Atelier d'Amande, sauf mention contraire. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3">4. Données personnelles</h2>
            <p className="text-[#6B5A4E] leading-relaxed">
              Ce site ne collecte pas de données personnelles à l'exception de celles transmises volontairement via les formulaires de contact ou de réservation. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous via WhatsApp ou Instagram.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3">5. Cookies</h2>
            <p className="text-[#6B5A4E] leading-relaxed">
              Ce site peut utiliser des cookies à des fins de mesure d'audience (Vercel Analytics). Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-3">6. Responsabilité</h2>
            <p className="text-[#6B5A4E] leading-relaxed">
              L'Atelier d'Amande ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site. Les informations présentées sont données à titre indicatif et peuvent être modifiées sans préavis.
            </p>
          </section>

        </div>

        <p className="text-[#8A7A6E] text-sm mt-16">
          Dernière mise à jour : mai 2026
        </p>

      </div>
    </main>
  )
}
