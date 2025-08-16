import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Contactus = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  email = "220701234@rajalakshmi.edu.in",
  phone = "(+91) 987654321",
  web = { label: "Github", url: "https://www.github.com/Sabarish-developer" },
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "220701234@rajalakshmi.edu.in",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.firstname} ${formData.lastname}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="container py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        {/* Left side - contact info */}
        <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
          <div className="text-center lg:text-left">
            <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="mx-auto w-fit lg:mx-0">
            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
              Contact Details
            </h3>
            <ul className="ml-4 list-disc">
              <li>
                <span className="font-bold">Phone: </span>
                {phone}
              </li>
              <li>
                <span className="font-bold">Email: </span>
                <a href={`mailto:${email}`} className="underline">
                  {email}
                </a>
              </li>
              <li>
                <span className="font-bold">Web: </span>
                <a href={web.url} target="_blank" rel="noreferrer" className="underline">
                  {web.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10"
        >
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                type="text"
                id="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                type="text"
                id="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};
