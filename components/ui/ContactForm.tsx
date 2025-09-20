"use client"
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from("feedback").insert([
      {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        numero: formData.numero,
        message: formData.message,
      },
    ]);

    if (error) {
      alert("Erreur lors de l'envoi du message: " + error.message);
    } else {
      alert("Message envoyé avec succès!");
      setFormData({ nom: "", prenom: "", email: "", numero: "", message: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
    >
      <div>
        <input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          type="text"
          placeholder="Nom"
          className="w-full border border-black rounded-md shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <input
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          type="text"
          placeholder="Prénom"
          className="w-full border border-black rounded-md shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="E-mail"
          className="w-full border border-black rounded-md shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <input
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          type="tel"
          placeholder="Numéro"
          className="w-full border border-black rounded-md shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="md:col-span-2">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={6}
          className="w-full border border-black rounded-md shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition"
        >
          ENVOYER
        </button>
      </div>
    </form>
  );
}
