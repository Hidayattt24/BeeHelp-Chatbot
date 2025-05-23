"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { TextEffect } from "@/components/ui/text-effect";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AutoResizeTextarea } from "@/components/ui/autoresize-textarea";
import { useState } from "react";

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [messages, setMessages] = useState<
    {
      content: string;
      role: "user" | "assistant";
    }[]
  >([]);
  const [input, setInput] = useState("");

  // Dummy responses
  const dummyResponses = [
    "Hai! Saya akan membantu menjawab pertanyaan kamu.",
    "Tentu, saya mengerti masalah yang kamu hadapi.",
    "Berdasarkan informasi yang kamu berikan, berikut solusinya...",
    "Apakah ada hal lain yang bisa saya bantu?",
    "Mari kita cari solusi bersama untuk masalah ini.",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { content: input, role: "user" as const };

    // Get random dummy response
    const randomResponse =
      dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
    const botMessage = { content: randomResponse, role: "assistant" as const };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <TextEffect preset="fade-in-blur" per="word">
        BeeHelp AI Assistant
      </TextEffect>
      <TextEffect preset="blur" per="word" delay={0.5}>
        Asisten AI untuk bantu kamu cari solusi cepat & efisien.
      </TextEffect>
      <TextEffect preset="slide" per="word" delay={1}>
        Tanya apa saja praktis, informatif, dan langsung dibalas.
      </TextEffect>
    </header>
  );

  const messageList = (
    <AnimatedGroup
      preset="blur-slide"
      className="my-4 flex h-fit min-h-full flex-col gap-4"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className="flex w-full justify-start data-[role=user]:justify-end"
        >
          <div
            className={cn(
              "inline-block max-w-[80%] rounded-xl px-3 py-2 text-sm",
              message.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-black"
            )}
            style={{ width: "fit-content" }}
          >
            {message.content}
          </div>
        </div>
      ))}
    </AnimatedGroup>
  );

  return (
    <main
      className={cn(
        "ring-none mx-auto flex h-svh max-h-svh w-full max-w-[35rem] flex-col items-stretch border-none",
        className
      )}
      {...props}
    >
      <div className="flex-1 content-center overflow-y-auto px-6">
        {messages.length ? messageList : header}
      </div>

      {/* Bungkus form dengan TooltipProvider */}
      <TooltipProvider>
        <form
          onSubmit={handleSubmit}
          className="border-input bg-background focus-within:ring-ring/10 relative mx-6 mb-6 flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-1 right-1 size-6 rounded-full"
              >
                <ArrowUpIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </TooltipProvider>
    </main>
  );
}
