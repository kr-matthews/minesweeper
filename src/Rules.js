import { useState } from "react";

// TODO: actual rules text
function RulesText() {
  return (
    <div>
      <h3>Rules</h3>
      <p>Do this.</p>
      <p>Don't do that.</p>
    </div>
  );
}

function Rules() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Rules" : "Show Rules"}
      </button>
      {isOpen && <RulesText />}
    </>
  );
}

export default Rules;
