import React, { useEffect, useState } from "react";
useEffect(() => {
  return () => {};
}, []);

function MyComponent() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [color, setColor] = useState("");
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const randomColor = generateRandomColor();
      setColor(randomColor);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div style={{ height: "100vh", backgroundColor: color }}>
      Window width : {windowSize.width}
      <br />
      Window height : {windowSize.height}
    </div>
  );
}

export default MyComponent;
