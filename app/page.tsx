import Link from "next/link"
import { Button } from "@/components/ui/button"
import PhotoCarousel from "@/components/ui/photocarousel"
import { Fullscreen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="w-full bg-gray-300 text-foreground p-4">
      <div className="w-full text-center space-y-10">

        <PhotoCarousel />

        {/* Section 1 */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6 relative md:static">
          <div className="w-full md:w-1/2 h-auto md:h-[347px]">
            <h2 className="text-2xl font-bold text-red-800">
              Définition des scouts:
            </h2>
            <p className="mt-4 text-black font-bold space-y-5">
              Le scoutisme tunisien est un mouvement éducatif, ouvert à tous les jeunes sans distinction, qui vise à développer leur potentiel physique, intellectuel, social et spirituel.
              Basé sur l’apprentissage par l’action, la vie en plein air, la discipline et le service communautaire, il encourage les valeurs de respect, d’entraide, de citoyenneté et de patriotisme.
              Membre actif de l’Organisation Mondiale du Mouvement Scout (OMMS), le scoutisme tunisien contribue à former des citoyens responsables, engagés et solidaires au service de leur pays et du monde.
            </p>
          </div>

          <div className="w-full md:w-1/2 h-56 md:h-[347px] bg-gray-300 rounded-lg shadow-md mt-4 md:mt-0 flex-shrink-0">
            <img src="scouts_chi3ar.jpg" alt="Scouts" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6 relative md:static">
          <div className="w-full md:w-1/2 h-auto md:h-[347px] md:order-2">
            <h2 className="text-2xl font-bold text-red-800">
              Histoires des scouts:
            </h2>
            <p className="mt-4 text-black font-bold space-y-5">
              Le scoutisme tunisien est né en 1934, en pleine période du protectorat français, grâce à des pionniers passionnés qui voulaient offrir aux jeunes tunisiens un espace d’éducation, de discipline et de liberté.
              Les premières troupes se sont formées à Tunis et dans d’autres grandes villes, inspirées par le mouvement scout mondial fondé par Robert Baden-Powell en 1907.

              Après l’indépendance en 1956, le mouvement a connu un essor important et s’est structuré au sein de l’Organisation du Scoutisme Tunisien (OST), qui est aujourd’hui membre de l’Organisation Mondiale du Mouvement Scout (OMMS).
            </p>
          </div>

          <div className="w-full md:w-1/2 h-56 md:h-[347px] bg-gray-300 rounded-lg shadow-md mt-4 md:mt-0 flex-shrink-0 md:order-1">
            <img src="scouts_chi3ar.jpg" alt="Scouts" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full bg-gray-300 mt-8 px-2 py-8">
          <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📍 Notre Siège Scout</h2>
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg flex items-center relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d564.8860944968509!2d10.989069387364005!3d36.78308093201363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302cbd81a3f08bd%3A0x3b529f8f6d91abb4!2z2KfZhNmD2LTYp9mB2Kkg2KfZhNiq2YjZhtiz2YrYqSDZgdmI2Kwg2YXZhtiy2YQg2KrZhdmK2YU!5e0!3m2!1sen!2stn!4v1754618093411!5m2!1sen!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
