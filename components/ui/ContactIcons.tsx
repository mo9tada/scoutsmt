import { Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function ContactIcons() {
    return (
        <div className="flex justify-center gap-12 py-8 bg-gray-300">
            {/* Phone */}
            <div className="flex flex-col items-center">
                <Phone className="text-red-500 w-8 h-8" />
                <p className="mt-2 text-sm font-semibold">+216 22341939</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center">
                <MapPin className="text-red-400 w-8 h-8" />
                <p className="mt-2 text-sm font-semibold"><a href="https://maps.app.goo.gl/LGJfoFN6KW254WQ9A">Location</a></p>
            </div>

            {/* Facebook */}
            <div className="flex flex-col items-center">
                <FaFacebookF className="bg-red-500 text-white w-8 h-8 p-1 rounded-full" />
                <p className="mt-2 text-sm font-semibold"><a href="https://www.facebook.com/share/1LZ2db9faT/?mibextid=wwXIfr">Facebook</a></p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
                <FaInstagram className="text-red-500 w-8 h-8" />
                <p className="mt-2 text-sm font-semibold"><a href="https://www.instagram.com/scouts_mt?igsh=MWdjaHlwZzgzdzd5aQ==">Instagram</a></p>
            </div>

            {/* Gmail */}
            <div className="flex flex-col items-center">
                <FaEnvelope className="bg-red-500 text-white w-8 h-8 p-1 rounded-full" />
                <p className="mt-2 text-sm font-semibold">ScoutsMT@gmail.com</p>
            </div>
        </div>
    );
}
