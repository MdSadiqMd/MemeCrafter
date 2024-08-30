import { FC, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const Text: FC = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [val, setVal] = useState<string>('Double click to Edit');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    return (
        <Draggable>
            {editMode ? (
                <input
                    ref={inputRef}
                    className="border border-gray-300 rounded-md p-2 text-lg"
                    onBlur={() => setEditMode(false)}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditMode(false)}
                />
            ) : (
                <h1
                    className="cursor-pointer text-2xl font-semibold bg-white p-2 rounded-md shadow-md hover:shadow-lg transition-shadow"
                    onDoubleClick={() => setEditMode(true)}
                >
                    {val}
                </h1>
            )}
        </Draggable>
    );
};

export default Text;