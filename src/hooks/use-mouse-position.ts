import React from 'react';

const useMousePosition = (ref: React.RefObject<any>) => {
  const [mousePosition, setMousePosition] = React.useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX - ref.current.getBoundingClientRect().left,
        y: ev.clientY - ref.current.getBoundingClientRect().top,
      });
    };
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [ref]);

  return mousePosition;
};

export default useMousePosition;
