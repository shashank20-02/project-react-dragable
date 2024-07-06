import { useState, useEffect, useRef } from "react";
import Box from "./Components/Box";

export default function App() {
    const [nums, setNums] = useState(1);
    const containerRef = useRef(null);
    const boxRef = useRef(null);

    const isClicked = useRef(null);

    const coords = useRef({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
    });

    useEffect(() => {
        if (!boxRef.current || !containerRef.current) return;

        const box = boxRef.current;
        const container = containerRef.current;

        const onMouseDown = (e) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        };

        const onMouseUp = (e) => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;
        };

        const onMouseMove = (e) => {
            if (!isClicked.current) return;

            const nextX =
                e.clientX - coords.current.startX + coords.current.lastX;
            const nextY =
                e.clientY - coords.current.startY + coords.current.lastY;
            console.log(box);
            box.style.top = `${nextY}px`;
            box.style.left = `${nextX}px`;
        };

        box.addEventListener("mousedown", onMouseDown);
        box.addEventListener("mouseup", onMouseUp);
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseleave", onMouseUp);

        const cleanup = () => {
            box.removeEventListener("mousedown", onMouseDown);
            box.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", onMouseUp);
        };

        return cleanup;
    }, []);
    const handleClick = () => {
        setNums((prev) => prev + 1);
    };
    return (
        <main>
            <div className="main" ref={containerRef}>
                <button className="btn" onClick={handleClick}>
                    Add Parent
                </button>
                <Box data={nums} boxRef={boxRef} />
            </div>
        </main>
    );
}
