import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { apiPost } from "@/services/fakeApi";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tagline: "",
    description: "",
    city: "",
    phone: "",
    email: "",
    rating: "5",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await apiPost("/addVendor", {
        ...formData,
        rating: Number(formData.rating),
      });

      setMessage("Vendor registered successfully!");

      setFormData({
        name: "",
        category: "",
        tagline: "",
        description: "",
        city: "",
        phone: "",
        email: "",
        rating: "5",
        image: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to register vendor.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-editorial py-12">
        <h1 className="font-display text-4xl text-ink">
          Register Your Business
        </h1>

        <p className="mt-2 text-muted-foreground">
          Join SOLINKO and get discovered by nearby customers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl space-y-4"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Tagline"
            className="w-full rounded-xl border p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-xl border p-3"
            rows={4}
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-xl border p-3"
          />

          <button
            type="submit"
            className="rounded-xl bg-ink text-primary-foreground px-6 py-3"
          >
            Register Vendor
          </button>

          {message && (
            <p className="text-sm font-medium">
              {message}
            </p>
          )}
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}