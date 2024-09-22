"use client";

import ContactForm from "../contact-form"
import Footer from '../footer';
import Menu from '../menu';

export default function Page() {
  return (
    <div className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 justify-center px-10 lg:px-40">
        <NameCard name="Gary" position="President" fax="+1 (647) 873 2777" cell="+1 (416) 985 7666" email="gary@hodytek.com" />
        <NameCard name="Jessie" position="Sales Manager" fax="+1 (647) 873 2777" cell="+1 (647) 385 6629" email="jessie.liu@hodytek.com" />
      </div>
      <ContactForm />
      <Footer />
    </div>
  )
}

function NameCard(props: { name: string, position: string, fax: string, cell: string, email: string }) {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex items-center p-6 space-x-6 mt-10">
      {/* Left section - icon */}
      <div className="bg-sky-100 hidden lg:block p-3 rounded-full flex items-center justify-center">
        <svg
          className="text-sky-500 h-12 w-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.28 0 4.14-1.86 4.14-4.14 0-2.28-1.86-4.14-4.14-4.14-2.28 0-4.14 1.86-4.14 4.14 0 2.28 1.86 4.14 4.14 4.14zM12 14.68c-2.5 0-7.5 1.25-7.5 3.75v1.43h15v-1.43c0-2.5-5-3.75-7.5-3.75z"
          />
        </svg>
      </div>

      {/* Right section - info */}
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-semibold text-sky-900">{props.name}</h2>
        <p className="text-sm text-sky-700">{props.position}</p>
        <div className="text-sm space-y-1">
          <p className="flex items-center">
            <span className="font-semibold text-sky-900">Fax:&nbsp;</span> {props.fax}
          </p>
          <p className="flex items-center">
            <span className="font-semibold text-sky-900">Cell:&nbsp;</span> {props.cell}
          </p>
          <p className="flex items-center">
            <span className="font-semibold text-sky-900">Email:&nbsp;</span> <a className="underline" href={`mailto:${props.email}`}>{props.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
