import { useState } from "react";

function ConfirmAndAct({ txt, action, setReset }) {
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleCancel() {
    setInput("");
    setReset("");
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (input === txt) {
      action();
      setReset("");
    } else {
      alert("Wrong confirmation; not reset.");
    }
  }

  return (
    <div className="resets">
      <form>
        <label htmlFor="input">{`Type "${txt}": `}</label>
        <input type="text" id="input" name="input" onChange={handleChange} />
        <button type="submit" onClick={handleConfirm}>
          Confirm reset
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ConfirmAndAct;
