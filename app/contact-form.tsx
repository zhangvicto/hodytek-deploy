"use client";
import { useId, useRef, useState, ChangeEvent, FormEvent } from "react";
import { Arrow } from "./ui";

export default function ContactForm() {
  const id = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setStatus("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdMI_Hegsp3wGduvX3iyYKIsHmKNsf9B_Rt7XiAGYG728K1pAP9SUUgghh9VdosNqFaA/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData),
          signal: controller.signal,
        },
      );
      if (!response.ok) throw new Error("Submission failed");
      setStatus("Thank you. Your message has been sent to our team.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus(
        "We couldn’t confirm delivery. Please try again or email inquiry@hodytek.com.",
      );
    } finally {
      clearTimeout(timeout);
      setSending(false);
      inFlight.current = false;
    }
  };
  return (
    <section className="contact-section" id="form">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">LET’S START A CONVERSATION</p>
          <h2>
            How can we help
            <br />
            your next project?
          </h2>
          <p>
            Tell us what you’re working on. Our team can help with product
            selection, technical requirements, and quotations.
          </p>
          <div className="contact-details">
            <div>
              <span>Email us</span>
              <a href="mailto:inquiry@hodytek.com">inquiry@hodytek.com</a>
            </div>
            <div>
              <span>Call us</span>
              <a href="tel:+16473856629">+1 647 385 6629</a>
            </div>
            <div>
              <span>Our location</span>
              <p>Toronto, Canada · Global support</p>
            </div>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-label="Project inquiry"
          aria-busy={sending}
        >
          <div className="form-field">
            <label htmlFor={id + "-name"}>Full name *</label>
            <input
              id={id + "-name"}
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={sending}
            />
          </div>
          <div className="form-field">
            <label htmlFor={id + "-email"}>Email address *</label>
            <input
              id={id + "-email"}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={sending}
            />
          </div>
          <div className="form-field full">
            <label htmlFor={id + "-phone"}>
              Phone number <span>(optional)</span>
            </label>
            <input
              id={id + "-phone"}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Include your country code"
              value={formData.phone}
              onChange={handleChange}
              disabled={sending}
            />
          </div>
          <div className="form-field full">
            <label htmlFor={id + "-message"}>How can we help? *</label>
            <textarea
              id={id + "-message"}
              name="message"
              placeholder="Tell us about your project or the products you need…"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              disabled={sending}
            />
          </div>
          <div className="form-actions">
            <button
              className="button button-primary"
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending…" : "Send inquiry"}
              <Arrow />
            </button>
            <p>
              Fields marked * are required.
              <br />
              We’ll use your details to respond to your inquiry.
            </p>
          </div>
          <p
            className={status ? "form-status" : "sr-only"}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
