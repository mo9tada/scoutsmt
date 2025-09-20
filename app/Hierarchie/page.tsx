import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Users, Star, Award, Crown, Shield, Heart } from "lucide-react"

const hierarchyLevels = [
  {
    id: 1,
    name: "Oisillon",
    ageRange: "5-7 ans",
    description: "Les plus jeunes scouts, découvrent le monde du scoutisme à travers le jeu et l'exploration.",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Star,
    activities: ["Jeux éducatifs", "Découverte de la nature", "Activités créatives", "Premiers apprentissages"],
  },
  {
    id: 2,
    name: "Louvetaux et Fleurettes",
    ageRange: "7-12 ans",
    description: "Développement de l'autonomie et de l'esprit d'équipe à travers des aventures adaptées à leur âge.",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: Users,
    activities: ["Camps de week-end", "Activités manuelles", "Jeux de piste", "Initiation aux techniques scoutes"],
  },
  {
    id: 3,
    name: "Scouts et Guides",
    ageRange: "12-17 ans",
    description: "Formation du caractère et développement des compétences techniques et sociales.",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Award,
    activities: ["Camps d'été", "Projets communautaires", "Techniques de survie", "Leadership junior"],
  },
  {
    id: 4,
    name: "Routiers et Routières",
    ageRange: "17-22 ans",
    description: "Préparation à la vie adulte avec un focus sur le service communautaire et le leadership.",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Crown,
    activities: [
      "Service communautaire",
      "Projets internationaux",
      "Formation au leadership",
      "Mentorat des plus jeunes",
    ],
  },

  {
    id: 5,
    name: "Chef",
    ageRange: "18+ ans",
    description: "Leaders expérimentés qui guident et forment les jeunes scouts dans leur développement.",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: Shield,
    activities: [
      "Formation des jeunes",
      "Organisation d'événements",
      "Gestion de troupe",
      "Développement de programmes",
    ],
  },
  {
    id: 6,
    name: "Ancien Et Amateurs",
    ageRange: "23+ ans",
    description: "Anciens scouts et sympathisants qui apportent un soutien financier et moral essentiel au groupe.",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Heart,
    activities: [
      "Soutien financier du groupe",
      "Conseil et mentorat",
      "Parrainage d'événements",
      "Réseau d'anciens scouts",
    ],
  },

]

export default function HierarchyPage() {
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 bg-red-800 text-white hover:bg-white hover:text-black">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Hiérarchie Scoute</h1>
            <p className="text-xl max-w-2xl mx-auto text-black">
              Découvrez les différents niveaux de notre mouvement scout, de l'Oisillon au Chef, chacun avec ses propres
              défis et opportunités de croissance.
            </p>
          </div>
        </div>

        {/* Hierarchy Cards */}
        <div className="space-y-6">
          {hierarchyLevels.map((level, index) => {
            const IconComponent = level.icon
            return (
              <Card key={level.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{level.name}</CardTitle>
                        <CardDescription className="text-lg">{level.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={level.color} variant="outline">
                      {level.ageRange}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Activités principales :</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {level.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Progress indicator */}
                {index < hierarchyLevels.length - 1 && (
                  <div className="flex justify-center pb-6">
                    <div className="w-px h-8 bg-border" />
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Rejoignez-nous !</CardTitle>
              <CardDescription className="text-lg">
                Peu importe votre âge, il y a une place pour vous dans notre mouvement scout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className=" text-white hover:bg-red-800 hover:text-white" >
                  <Link href="/Formulaire">S'inscrire maintenant</Link>
                </Button>
                <Button asChild size="lg" className=" text-white hover:bg-red-800 hover:text-white" >
                  <Link href="/Evenements">Voir nos événements</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
