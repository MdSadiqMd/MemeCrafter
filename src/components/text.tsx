"use client";

import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

import 'react-resizable/css/styles.css';

interface TextProps {
    onDelete: () => void;
}

const Text: React.FC<TextProps> = ({ onDelete }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [val, setVal] = useState<string>('Double click to Edit');
    const [isResizing, setIsResizing] = useState<boolean>(false);

    return (
        <div className="relative">
            <Draggable
                handle=".drag-handle"
                onStart={() => {
                    if (isResizing) {
                        return false;
                    }
                }}
            >
                <div className="relative p-2 bg-transparent rounded-lg shadow-lg">
                    <ResizableBox
                        width={200}
                        height={100}
                        minConstraints={[100, 50]}
                        maxConstraints={[400, 300]}
                        className="resizable-box"
                        onResizeStart={() => setIsResizing(true)}
                        onResizeStop={() => setIsResizing(false)}
                        handle={<span className="resize-handle" />}
                        style={{ background: 'transparent' }}
                    >
                        <div className="resize-content drag-handle">
                            {editMode ? (
                                <input
                                    onDoubleClick={() => setEditMode(false)}
                                    value={val}
                                    onChange={(e) => setVal(e.target.value)}
                                    className="w-full h-full"
                                />
                            ) : (
                                <h1 onDoubleClick={() => setEditMode(true)}>{val}</h1>
                            )}
                        </div>
                    </ResizableBox>
                    <button
                        onClick={onDelete}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-2"
                    >
                        ×
                    </button>
                </div>
            </Draggable>
        </div>
    );
};

export default Text;