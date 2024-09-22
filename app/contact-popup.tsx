import { ContactButton } from "./contact-button"

export default function ContactPopUp() {
  return (
    <div className="bg-white px-10 lg:px-40 pb-10 bottom-0 lg:bottom-10">
      <h1 className="text-2xl font-bold py-2 text-sky-900">Need Help?</h1>
      <ContactButton />
    </div>
  )
}
