// components/ContactForm.tsx

import { useState, ChangeEvent, FormEvent } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzOcOsws0pNurPS26u8oIDTqaiw2csq6KHkVcGJo3Nw_F7XoJ5lFTTku8iGfqGvSAQmTw/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData),
        }
      );

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset the form on success
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatusMessage('An error occurred. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg mt-10" id="form">
      <h2 className="text-2xl font-bold mb-4">How Can We Help?</h2>
      <form className="gform space-y-4" onSubmit={handleSubmit}>
        <div>
          <p className="mb-4">We&apos;d love to hear from you! Please fill out the form below, and we&apos;ll get back to you as soon as possible.</p>
          <label htmlFor="name" className="block text-sm font-medium text-sky-700">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-b focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-sky-700">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-b focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-sky-700">Phone *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border-b focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-sky-700">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full border-b focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            rows={4}
          ></textarea>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Send
          </button>
          {statusMessage && (
            <p className="self-center ml-4 text-sm text-sky-700">{statusMessage}</p>
          )}
        </div>

      </form>
    </div>
  );
};

export default ContactForm;
