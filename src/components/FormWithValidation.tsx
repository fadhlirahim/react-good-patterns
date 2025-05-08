import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Zod schema for form validation
 */
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

/**
 * Type for the form data based on the Zod schema
 */
type ContactFormData = z.infer<typeof contactSchema>;

/**
 * FormWithValidation component that demonstrates using React Hook Form with Zod for validation
 */
const FormWithValidation: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Form Management (React Hook Form + Zod)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content">
        {isSubmitSuccessful ? (
          <div className="p-4 rounded bg-green-50 text-green-600 text-center border border-green-200 shadow">
            Form submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                {...register('name')}
                className={`input ${errors.name ? 'input-error' : ''}`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                {...register('message')}
                className={`input min-h-[100px] ${errors.message ? 'input-error' : ''}`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormWithValidation;
