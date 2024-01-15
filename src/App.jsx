import React, { useState } from "react";

// Define the main App component
const App = () => {
  // State for managing the input text
  const [text, setText] = useState("");

  // Event handler to update the text state as the user types
  const handleChange = (event) => {
    setText(event.target.value.slice(0, 64));
  };

  // Function to render text with specified color
  const renderTextWithColor = (text, isTomato) => (
    <span key={text} className={isTomato ? "text-red-500" : "text-black"}>
      {text}
    </span>
  );

  // Function to process and render text, highlighting occurrences of "tomato"
  const renderText = () => {
    const lowerCasedText = text.toLowerCase();
    const parts = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const tomatoIndex = lowerCasedText.indexOf("tomato", currentIndex);

      if (tomatoIndex === -1) {
        parts.push(renderTextWithColor(text.slice(currentIndex), false));
        break;
      }

      parts.push(
        renderTextWithColor(text.slice(currentIndex, tomatoIndex), false)
      );
      parts.push(renderTextWithColor("tomato", true));
      currentIndex = tomatoIndex + 6;
    }

    return parts;
  };

  // Map the formatted text for rendering
  const formattedText = renderText().map((part, index) => (
    <React.Fragment key={index}>{part}</React.Fragment>
  ));

  // Render the main JSX structure
  return (
    <div className="container mx-auto p-4 flex justify-center items-center w-screen h-screen">
      <div className="w-4/5 relative mb-4">
        {/* Input field */}
        <input
          type="text"
          value={text}
          onChange={handleChange}
          maxLength={64}
          className="w-full p-2 border-2 border-black"
        />
        {/* Display formatted text above the input field */}
        <div className="absolute top-[2px] left-[2px] p-2 pointer-events-none">
          {formattedText}
        </div>
      </div>
    </div>
  );
};

// Export the App component as the default export
export default App;
