import ContactForm from "../contact-form";
import Footer from "../footer";
import Menu from "../menu";
import { PageHeading } from "../ui";
export default function Page() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="CONTACT HODYTEK"
          title="Let’s move your project forward."
          description="Connect with our team for product inquiries, technical support, or a quotation tailored to your requirements."
        />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
