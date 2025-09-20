import React from 'react'
import { Navbar } from '@/components/navbar'
import ContactHero from '@/components/ui/ContactHero'
import ContactIcons from '@/components/ui/ContactIcons'
import ContactForm from '@/components/ui/ContactForm'
const page = () => {
  return (
    <div className='bg-gray-300 min-h-screen '>
      <ContactHero/>
      <ContactIcons/>
      <ContactForm/>
    </div>

  )
}

export default page