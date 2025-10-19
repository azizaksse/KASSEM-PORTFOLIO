"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
  validation?: (value: string) => string | null;
}

interface AccessibilityEnhancedFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
  className?: string;
}

export function AccessibilityEnhancedForm({
  fields,
  onSubmit,
  submitText = "Send Message",
  className = "",
}: AccessibilityEnhancedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Add focus indicators
        document.body.classList.add("keyboard-navigation");
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-navigation");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const validateField = (name: string, value: string): string | null => {
    const field = fields.find(f => f.name === name);
    if (!field) return null;

    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      return field.validation(value);
    }

    return null;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Validate field
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field.name, formData[field.name] || "");
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData);
        // Reset form on success
        setFormData({});
        setErrors({});
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <label
            htmlFor={field.name}
            className="group flex flex-col gap-2 rounded-2xl border border-white/15 bg-[rgba(9,13,23,0.62)] px-5 py-4 transition-all duration-300 focus-within:border-sky-400/60 focus-within:bg-[rgba(9,13,23,0.8)]"
          >
            <span className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
              {field.label}
              {field.required && (
                <span className="ml-1 text-red-400" aria-label="required">
                  *
                </span>
              )}
            </span>
            
            {field.type === "textarea" ? (
              <motion.textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                className="h-36 w-full resize-none border-none bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                aria-invalid={!!errors[field.name]}
                required={field.required}
              />
            ) : (
              <motion.input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                className="w-full border-none bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                aria-invalid={!!errors[field.name]}
                required={field.required}
              />
            )}
            
            {/* Focus indicator */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/10 to-indigo-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: focusedField === field.name ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </label>

          {/* Error message */}
          {errors[field.name] && (
            <motion.div
              id={`${field.name}-error`}
              className="mt-2 flex items-center gap-2 text-sm text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              role="alert"
              aria-live="polite"
            >
              <span aria-hidden="true">{"\u26A0"}</span>
              {errors[field.name]}
            </motion.div>
          )}
        </motion.div>
      ))}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="group relative inline-flex w-max items-center justify-center overflow-hidden rounded-full bg-[#3bf7ff] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_22px_60px_-28px_rgba(59,247,255,0.85)] transition-all duration-300 hover:bg-[#73fcff] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-describedby="submit-status"
      >
        <motion.span
          className="relative z-10 flex items-center gap-2"
          animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
        >
          {isSubmitting ? (
            <>
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </>
          ) : (
            <>
              {submitText}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {"\u2192"}
              </motion.span>
            </>
          )}
        </motion.span>
        
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Status message for screen readers */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {isSubmitting ? "Submitting form..." : "Form ready to submit"}
      </div>
    </motion.form>
  );
}




