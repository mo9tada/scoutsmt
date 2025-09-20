import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API received:", body);

    // Convert Oui/Non to boolean
    const cnssBool = body.cnss === true || body.cnss === "Oui";
    const firstTimeScoutBool = body.first_time_scout === true || body.first_time_scout === "Oui";

    const { data, error } = await supabase.from("users").insert([
      {
        last_name: body.last_name,
        first_name: body.first_name,
        father_name: body.father_name,
        mother_name: body.mother_name,
        cnss: cnssBool,
        family_status: body.family_status,
        email: body.email,
        phone: body.phone,
        father_phone: body.father_phone,
        gender: body.gender,
        date_de_naissance: body.date_de_naissance,
        first_time_scout: firstTimeScoutBool,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ message: "Erreur lors de l'insertion dans la DB." }, { status: 500 });
    }

    return NextResponse.json({ message: "Inscription réussie!", data });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ message: error.message || "Erreur lors de l'inscription." }, { status: 500 });
  }
}
