import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-relative border-b bg-gray-300" role="banner">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link
                    href="/"
                    className="text-red-800 flex items-center gap-2 font-semibold"
                    prefetch={false}
                >
                    <span className="text-lg">Scouts Menzel Temime</span>
                </Link>
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="text-red-800 hover:text-black" prefetch={false}>
                        Acceuil
                    </Link>
                    <Link href="/Hierarchie" className="text-red-800 hover:text-black" prefetch={false}>
                        Hierarchie
                    </Link>
                    <Link href="/Evenements" className="text-red-800 hover:text-black" prefetch={false}>
                        Evenements
                    </Link>
                    <Link href="/Contact" className="text-red-800 hover:text-black" prefetch={false}>
                        Contact
                    </Link>
                    <Button asChild size="lg" className="bg-red-800 hover:bg-white hover:text-black">
                        <Link href="/Formulaire">Formulaire</Link>
                    </Button>
                </nav>
                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <MenuIcon className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4" id="mobile-menu-title">Menu</h2>
                                <nav className="flex flex-col gap-4 text-sm font-medium" aria-labelledby="mobile-menu-title">
                                    <Link href="/" className="text-red-800 hover:text-black" prefetch={false}>
                                        Acceuil
                                    </Link>
                                    <Link href="/Hierarchie" className="text-red-800 hover:text-black" prefetch={false}>
                                        Hierarchie
                                    </Link>
                                    <Link href="/Evenements" className="text-red-800 hover:text-black" prefetch={false}>
                                        Evenements
                                    </Link>
                                    <Link href="/Contact" className="text-red-800 hover:text-black" prefetch={false}>
                                        Contact
                                    </Link>
                                    <Button asChild size="lg" className="bg-red-800 hover:bg-white hover:text-black">
                                        <Link href="/Formulaire">Formulaire</Link>
                                    </Button>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
