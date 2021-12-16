import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Circle, Text } from 'react-konva';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: 0,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const App = () => {
  const [circles, setCircles] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: circle.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a star" />
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            radius={50}
            fill="#0073ff"
            opacity={1}
            draggable
            rotation={circle.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={circle.isDragging ? 10 : 5}
            shadowOffsetY={circle.isDragging ? 10 : 5}
            scaleX={circle.isDragging ? 1.2 : 1}
            scaleY={circle.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById('root'));

export default App;
