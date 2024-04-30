import { CursorChatProps, CursorMode } from "@/types/type";
import CursorSVG from "@/public/assets/CursorSVG";

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        // @ts-ignore
        previousMessage: cursorState.message,
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  };

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform:` translateX(${cursor.x}px) translateY(${cursor.y}px),`
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />

          <div
            className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
            onKeyUp={(e) => e.stopPropagation()}
            style={{
              borderRadius: 20,
            }}
          >
            {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
            <input
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? "" : "Say something…"}
              value={cursorState.message}
              maxLength={50}
              className="z-10 w-60 h-10 px-3 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;