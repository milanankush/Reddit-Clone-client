import ClickOutHandler from "react-clickout-handler";

export function Popup({ children, open, onClickOut }) {
  const visibleClass = open ? "block" : "hidden";
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0, 0, 0, .8)" }}
    >
      <ClickOutHandler
        onClickOut={() => {
          onClickOut();
        }}
      >
        <div className="w-3/4 md:w-2/4 border border-reddit_dark-brightest bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md">
          {children}
        </div>
      </ClickOutHandler>
    </div>
  );
}
