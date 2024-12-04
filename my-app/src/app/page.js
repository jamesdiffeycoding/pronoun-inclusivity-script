"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [preferencesMaleFemale, setPreferences] = useState({
    male: true,
    female: false,
  });

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  // Modify text and wrap words surrounded by *** with a <span> tag for highlighting
  function modifyText(text) {
    return (
      text
        .replace(/\b(he|she)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They***"
            : "***they***";
        })
        .replace(/\b(his|her|hers)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Their***"
            : "***their***";
        })
        .replace(/\b(him)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Them***"
            : "***them***";
        })
        .replace(/\b(himself|herself)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Themself***"
            : "***themself***";
        })
        // Wrap words surrounded by *** with a span tag for highlighting
        .replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => {
          return `<span class="text-purple-300">${p1}</span>`;
        })
    );
  }

  useEffect(() => {
    let modifiedOutput = modifyText(input);
    setOutput(modifiedOutput);
  }, [input]);

  return (
    <div className="bg-black text-white flex-1 flex flex-col justify-center h-full items-center">
      {/* HEADING */}
      <section className="text-center m-4">
        <h1 className="text-2xl font-bold pb-4">Pronoun inclusivity script</h1>
        <p>A simple script to make your text gender-neutral.</p>
      </section>
      {/* INPUT */}
      <section className="text-center m-4 w-full">
        <h3 className="text-xl font-bold p-4 text-purple-400">
          Enter your text below
        </h3>

        <textarea
          onChange={handleInputChange}
          value={input}
          rows={6}
          cols={30}
          placeholder="Enter your text here"
          className="text-black p-2 text-sm m-4 w-full min-w-96 max-w-[50%] rounded"
        />
      </section>

      {/* OUTPUT */}
      <section className="text-center m-4">
        <h3 className="text-xl font-bold pt-4 text-purple-400">
          See the result below
        </h3>
        <p className="text-xs pb-4 italic">Changes get highlighted in purple</p>
        <div
          dangerouslySetInnerHTML={{ __html: output }} // Render the modified HTML
        />
      </section>
    </div>
  );
}
