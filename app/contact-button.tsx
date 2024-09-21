import Link from "next/link"

export function ContactButton() {
  return (<Link className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" href="/contact">Contact Us</Link>)
}
