"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2,Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import api from "@/api";
import {
  formSchema as FormSchema,
  FormValues,
} from "@/lib/schema/contact-form.schema";

import { Button } from "./ui/button";

export default function ContactForm() {
  const [capchanums, setCapchanums] = React.useState<{
    num1: number | null;
    num2: number | null;
  }>({
    num1: null,
    num2: null,
  });

  // Generate captcha numbers only on client to avoid hydration mismatch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCapchanums({
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [captcha, setCaptcha] = React.useState("");
  const [captchaErr, setCaptchaErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const regenerateCaptcha = React.useCallback(() => {
    setCapchanums({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10),
    });
    setCaptcha("");
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (capchanums.num1 === null || capchanums.num2 === null) {
      return;
    }

    if (
      Number.isNaN(parseInt(captcha)) ||
      parseInt(captcha) !== capchanums.num1 + capchanums.num2
    ) {
      setCaptchaErr(true);
      setTimeout(() => {
        setCaptchaErr(false);
      }, 3000);
    } else {
      try {
        setLoading(true);
        const res = await api.post("/contact", data);
        if (res.status === 200) {
          regenerateCaptcha();
          reset();
          toast("Your message has been sent");
        } else {
          toast.error("Error sending message");
        }
      } catch (err) {
        console.error({ err });
        toast.error("Unable to send message! Try again");
      } finally {
        regenerateCaptcha();
        setLoading(false);
      }
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-white/60 font-medium">Your Name</label>
        <input
          type="text"
          {...register("name")}
          className={inputClasses}
          placeholder="John Kumar"
        />
        {errors.name && (
          <span className="text-red-400 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-white/60 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className={inputClasses}
            placeholder="john@codeltix.com"
          />
          {errors.email && (
            <span className="text-red-400 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/60 font-medium">
            WhatsApp (Optional)
          </label>
          <input
            type="text"
            {...register("whatsapp")}
            className={inputClasses}
            placeholder="+91 1234567890"
          />
          {errors.whatsapp && (
            <span className="text-red-400 text-xs">
              {errors.whatsapp.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/60 font-medium">Message</label>
        <textarea
          {...register("message")}
          className={`${inputClasses} resize-none min-h-[120px]`}
          placeholder="Tell me about your project..."
          rows={4}
        />
        {errors.message && (
          <span className="text-red-400 text-xs">{errors.message.message}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
        <span className="text-sm text-white/60">Verify you&apos;re Alien:</span>
        <div className="flex items-center gap-2">
          <motion.span
            key={`num1-${capchanums.num1}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1.5 bg-primary/20 text-primary font-mono font-bold rounded"
          >
            {capchanums.num1 ?? "?"}
          </motion.span>
          <span className="text-white/40">+</span>
          <motion.span
            key={`num2-${capchanums.num2}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1.5 bg-primary/20 text-primary font-mono font-bold rounded"
          >
            {capchanums.num2 ?? "?"}
          </motion.span>
          <span className="text-white/40">=</span>
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            className="w-14 bg-white/10 border border-white/20 rounded px-3 py-1.5 text-center font-mono outline-none focus:border-primary/50 transition-colors"
            placeholder="?"
          />
        </div>
        {captchaErr && (
          <span className="text-red-400 text-xs animate-pulse">
            Incorrect answer
          </span>
        )}
      </div>

      <Button
        disabled={loading}
        type="submit"
        size="lg"
        className="w-full sm:w-auto px-8 py-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-300 group"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
