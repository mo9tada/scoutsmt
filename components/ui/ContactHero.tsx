import Image from 'next/image';
import banner from './scouts_chi3ar.jpg'; // replace with your image

export default function ContactHero() {
  return (
    <div className="relative w-relative h-80 bg-gray-300">
      {/* Background image */}
      <Image
        src={banner}
        alt="Contact banner"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-red-900/40" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold tracking-widest">CONTACTEZ-NOUS</h1>
        
        {/* Decorative line */}
        <div className="mt-4 flex items-center space-x-2">
          <span className="h-[2px] w-12 bg-black" />
          <span className="h-2 w-2 bg-black" />
          <span className="h-[2px] w-12 bg-black" />
        </div>
      </div>
    </div>
  );
}
