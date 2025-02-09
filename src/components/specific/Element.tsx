//Lib
import React, { forwardRef, Ref } from 'react';
//Styles
import classes from './Element.module.css';

type ElementProps = {
  id: number;
  src: string;
  name: string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
};

//Dùng forwardRef để nhận ref từ Component cha
const Element = forwardRef<HTMLDivElement, ElementProps>((props, ref) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      'element',
      JSON.stringify({
        id: props.id,
        src: props.src,
        name: props.name,
        type: props.type,
      })
    );
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (props.onDragEnd) props.onDragEnd(e);
  };

  return (
    <div
      className={props.className}
      data-name={props.name}
      style={{
        ...props?.style,
      }}
      ref={ref as Ref<HTMLDivElement>}
    >
      <img
        src={props.src}
        alt={props.name}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
      <div className={classes.elementName}>{props.name}</div>
    </div>
  );
});

export default Element;
