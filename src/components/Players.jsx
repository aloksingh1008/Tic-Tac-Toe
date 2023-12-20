import { useState } from "react";
export default function Players({ name, symbol, isActive, onNameChange }) {
  const [playerName, editPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  function handleIsEditing() {
    setIsEditing((cur) => !cur);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  }
  function handleInput(event) {
    editPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing && (
          <span className="player-name">
            <input type="text" value={playerName} onChange={handleInput} />
          </span>
        )}
        {!isEditing && <span className="player-name">{playerName}</span>}
        <span className="player-logo">{symbol}</span>
      </span>

      <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
