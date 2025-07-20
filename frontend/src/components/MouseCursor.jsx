import React, { useEffect, useRef, useState, useCallback } from 'react';

const MouseCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const rafRef = useRef(null);

    const editCursor = useCallback((e) => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            const cursor = cursorRef.current;
            if (cursor) {
                const { clientX: x, clientY: y } = e;
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
            }
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    useEffect(() => {
        const links = document.querySelectorAll('nav > .hover-this');

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cursor-enabled');

        // Add event listeners
        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', editCursor);

        // Cleanup function
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });

            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });

            window.removeEventListener('mousemove', editCursor);
        };
    }, [editCursor, handleMouseEnter, handleMouseLeave]);

    return (
        <div
            ref={cursorRef}
            className={`cursor fixed pointer-events-none z-[9999] w-6 h-6 rounded-full transition-transform duration-200 ease-out ${isHovering ? 'scale-150 cursor-hover' : 'cursor-normal'
                }`}
            style={{
                transform: 'translate(-50%, -50%)',
                willChange: 'transform'
            }}
        />
    );
};

export default MouseCursor; 