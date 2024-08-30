import React, { useState } from "react";
import Draggable from "react-draggable";

interface TextProps {
    onDelete: () => void;
}

const Text: React.FC<TextProps> = ({ onDelete }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [val, setVal] = useState<string>('Double click to Edit');
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <Draggable>
            <div
                className={`relative ${selected ? 'border-2 border-blue-500' : ''} p-2 bg-white rounded-lg shadow-lg`}
                onClick={() => setSelected(!selected)}
            >
                {editMode ? (
                    <input
                        onDoubleClick={() => setEditMode(false)}
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-1"
                    />
                ) : (
                    <h1 onDoubleClick={() => setEditMode(true)}>{val}</h1>
                )}
                {selected && (
                    <button
                        onClick={onDelete}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-2"
                    >
                        ×
                    </button>
                )}
            </div>
        </Draggable>
    );
};

export default Text;