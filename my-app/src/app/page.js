"use client"; // Add this at the very top

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState(
    "Spider-Man first noticed Lois Lane while swinging through New York City. He was always a fan of the city, and now he loved it more. She was beautiful and Spiderman was captivated by her. Their paths kept crossing, and Spider-Man admired her strength and resilience. Over time, their bond deepened, Spider-Man found he was falling for her. It wasn't long before he bought a ring for her."
  );
  const [outputWithHighlights, setOutputWithHighlights] = useState("");
  const [output, setOutput] = useState("");

  const [preferencesMaleFemale, setPreferences] = useState({
    male: true,
    female: true,
  });

  // Reference to the textarea element
  const textareaRef = useRef(null);

  // Auto-resize the textarea height based on its content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
    }
  }, [input]); // Run when the input changes

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  // Modify text and wrap words surrounded by *** with a <span> tag for highlighting
  function modifyText(text) {
    // Conditionally replace male pronouns based on preferences
    if (preferencesMaleFemale.male) {
      text = text
        .replace(/\b(he was)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They were***"
            : "***they were***";
        })
        .replace(/\b(he is)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They are***"
            : "***they are***";
        })
        .replace(/\b(he's)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They're***"
            : "***they're***";
        })
        .replace(/\b(he)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They***"
            : "***they***";
        })
        .replace(/\b(his)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Their***"
            : "***their***";
        })
        .replace(/\him(?=[\.,!?;:])\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Them***"
            : "***them***";
        })
        .replace(/\him(?![\.,!?;:])\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Their***"
            : "***their***";
        })
        .replace(/\b(himself)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Themself***"
            : "***themself***";
        });
    }

    // Conditionally replace female pronouns based on preferences
    if (preferencesMaleFemale.female) {
      text = text
        .replace(/\b(she was)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They were***"
            : "***they were***";
        })
        .replace(/\b(she is)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They are***"
            : "***they are***";
        })
        .replace(/\b(she's)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They're***"
            : "***they're***";
        })
        .replace(/\b(she)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***They***"
            : "***they***";
        })
        .replace(/\bher(?=[\.,!?;:])\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Them***"
            : "***them***";
        })
        .replace(/\bher(?![\.,!?;:])\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Their***"
            : "***their***";
        })
        .replace(/\b(hers)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Theirs***"
            : "***theirs***";
        })
        .replace(/\b(herself)\b/gi, (match) => {
          return match[0] === match[0].toUpperCase()
            ? "***Themself***"
            : "***themself***";
        });
    }
    let textToCopy = text.replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => {
      return `${p1}`;
    });
    setOutput(textToCopy);

    // Wrap words surrounded by *** with a span tag for highlighting
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => {
      return `<span class="text-purple-300">${p1}</span>`;
    });

    // Convert newline characters to <br /> for line breaks
    text = text.replace(/\n/g, "<br />");

    return text;
  }

  function copyOutput(e) {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  }

  useEffect(() => {
    let modifiedOutputWithHighlights = modifyText(input);
    setOutputWithHighlights(modifiedOutputWithHighlights);
  }, [input, preferencesMaleFemale]); // Update when preferences change

  return (
    <div className="bg-slate-900 text-white flex-1 flex flex-col justify-center h-full items-center">
      {/* HEADING */}
      <section className="text-center m-4">
        <h1 className="text-2xl font-bold pb-4">Pronoun inclusivity script</h1>
        <p>A simple script to make your text gender-neutral.</p>
      </section>

      {/* PREFERENCES */}
      <section className="text-center m-4">
        <h3 className="text-xl font-bold p-4 text-purple-400">
          Select Pronouns to Modify
        </h3>
        <div className="text-left">
          <div>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={preferencesMaleFemale.male}
                onChange={() =>
                  setPreferences((prev) => ({ ...prev, male: !prev.male }))
                }
              />
              he / his / him / himself
            </label>
          </div>
          <div>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={preferencesMaleFemale.female}
                onChange={() =>
                  setPreferences((prev) => ({ ...prev, female: !prev.female }))
                }
              />
              she / her / her / hers / herself
            </label>
          </div>
        </div>
      </section>

      {/* INPUT AND OUTPUtWithHighlights CONTAINER (Grid layout with 3 columns on large screens) */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_5px_1fr] lg:gap-8 w-full">
        {/* --- INPUT */}
        <section className="text-center m-4">
          <h3 className="text-xl font-bold p-4 text-purple-400">
            Enter your text below
          </h3>
          <textarea
            ref={textareaRef}
            onChange={handleInputChange}
            value={input}
            placeholder="Enter your text here..."
            className="text-black hover:bg-slate-400 bg-slate-200 placeholder:text-slate-800 p-2 text-sm mt-4 w-full min-h-32 min-w-96 max-w-[90%] rounded resize-none"
          />
        </section>

        {/* --- ARROW ICON (in the second column on large screens) */}
        <section className="flex justify-center items-center text-4xl text-white max-h-[20rem]">
          <span>→</span>
        </section>

        {/* --- OUTPUT */}
        <section className="text-center m-4">
          <h3 className="text-xl font-bold pt-4 text-purple-400">
            See the result below
          </h3>
          <p className="text-xs italic mb-8">
            Changes get highlighted in purple to help you check the changes.
            Click below to copy the text.
          </p>
          <div className="flex flex-col items-center text-left w-full min-h-32">
            <div
              className="hover:cursor-pointer hover:bg-slate-700 min-w-96 max-w-[90%] text-sm p-4 border border-slate-300 rounded bg-slate-800"
              dangerouslySetInnerHTML={{ __html: outputWithHighlights }} // Render the modified HTML
              onClick={() => copyOutput()} // Copy the outputWithHighlights to clipboard when clicked
            />
          </div>
        </section>
      </section>
    </div>
  );
}
