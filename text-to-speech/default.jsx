import React, { useState, useEffect } from "react";
import { useFusionContext } from "fusion:context";
import { useSpeechSynthesis } from "react-speech-kit";
import "./style.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const { globalContent } = useFusionContext();
  const { speak, cancel, speaking } = useSpeechSynthesis();

  useEffect(() => {
    const { basic: headlines = "" } = globalContent?.headlines || {};
    const { basic: subheadlines = "" } = globalContent?.subheadlines || {};
    let body = "";
    globalContent.content_elements.forEach((element) => {
      if (element.type == "text" || element.type == "header") {
        body += element.content;
        body += " ";
      } else if (element.type == "quote") {
        element.content_elements.forEach((e) => {
          body += e.content;
        });
        body += " cited from ";
        body += element.citation.content;
      }
    });
    body = body.replace(/<\/?[^>]+(>|$)/g, "");
    setText(headlines + ". " + subheadlines + ". " + body);
  }, []);
  return (
    <>
      {!speaking && (
        <button
          className="text-to-speech-button"
          onClick={() => speak({ text: text })}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 78 78"
          >
            <circle class="cls-1" cx="39" cy="39" r="39" />
            <polygon
              class="cls-2"
              points="59.51 39.33 27.51 20.86 27.51 57.81 59.51 39.33"
            />
          </svg>
          <div>Listen to this article</div>
        </button>
      )}
      {speaking && (
        <button className="text-to-speech-button" onClick={() => cancel()}>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 78 78"
          >
            <circle class="cls-1" cx="39" cy="39" r="39" />
            <rect class="cls-2" x="23" y="23" width="32" height="32" />
          </svg>
          <div>Stop listening</div>
        </button>
      )}
    </>
  );
};

TextToSpeech.displayName = "Text to Speech - Custom Block";

export default TextToSpeech;
