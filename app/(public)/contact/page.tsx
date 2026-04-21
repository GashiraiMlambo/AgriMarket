'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">support@agromarket.co.zw</p>
                <p className="text-sm text-muted-foreground">sales@agromarket.co.zw</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="mt-1 text-sm text-muted-foreground">+263 77 123 4567</p>
                <p className="text-sm text-muted-foreground">+263 24 123 456</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  123 Market Street<br />
                  Harare, Zimbabwe
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="mt-1 text-sm text-muted-foreground">Monday - Friday: 8am - 6pm</p>
                <p className="text-sm text-muted-foreground">Saturday: 9am - 4pm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="name">Your Name</FieldLabel>
                    <Input id="name" {...register('name')} placeholder="John Doe" />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input id="subject" {...register('subject')} placeholder="How can we help?" />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </Field>
              </FieldGroup>
              <Button type="submit" className="mt-6 w-full gap-2" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
