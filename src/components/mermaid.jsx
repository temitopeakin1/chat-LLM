import React, { useEffect, useRef, forwardRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

const ItemTypes = {
  DIAGRAM: 'diagram',
};

const DraggableDiagram = ({ children }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.DIAGRAM,
    item: { id: 'diagram' },
  }));

  return (
    <div ref={drag} style={{ cursor: 'move' }}>
      {children}
    </div>
  );
};

// Forward ref to the TransformWrapper component
const ForwardedTransformWrapper = forwardRef((props, ref) => (
  <TransformWrapper ref={ref} {...props}>
    {props.children}
  </TransformWrapper>
));

const Mermaid = ({ graphDefinition }) => {
  const zoomWrapperRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      mermaid.initialize({ startOnLoad: false });
      mermaid.run(undefined, diagramRef.current);
    };

    initializeMermaid();
  }, []);

  useEffect(() => {
    if (graphDefinition) {
      mermaid.contentLoaded();
    }

    const fitToBounds = () => {
      if (zoomWrapperRef.current) {
        zoomWrapperRef.current.setTransform(0, 0, 2); // Set initial zoom to 2x
        setTimeout(() => {
          zoomWrapperRef.current.centerView(); // Center the view after setting the transform
        }, 0);
      }
    };

    fitToBounds();
  }, [graphDefinition]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!zoomWrapperRef.current) return;
      e.preventDefault();
      const { zoomIn, zoomOut } = zoomWrapperRef.current;
      if (e.deltaY < 0) {
        zoomIn(0.5); // Increase zoom level by a factor
      } else {
        zoomOut(0.5); // Decrease zoom level by a factor
      }
    };

    const container = document.getElementById('output-container');
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (graphDefinition === '') return <></>;

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
          <TransformWrapper
            ref={zoomWrapperRef}
            wheel={{ disabled: true }} // Disable default wheel zoom
            scale={{ maxScale: 10, minScale: 0.1 }} // Adjust the scale limits as needed
            // initialScale={1}
          >
            <TransformComponent>
              <div
                id="output-container"
                className="p-4 bg-gray-100 rounded-md shadow-md overflow-auto"
                style={{ minHeight: '100vh', minWidth: '70vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <DraggableDiagram>
                  <div ref={diagramRef}>
                    <div className="mermaid" style={{minWidth: '50vw', minHeight: '30vh'}}>
                      {graphDefinition}
                    </div>
                  </div>
                </DraggableDiagram>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </DndProvider>
    </>
  );
};

export default Mermaid;
