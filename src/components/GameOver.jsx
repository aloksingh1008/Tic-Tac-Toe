export default function GameOver({ winner, rematch }) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a Draw</p>}

      <p>
        <button onClick={rematch}>Rematch</button>
      </p>
    </div>
  );
}
