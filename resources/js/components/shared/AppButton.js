import React from 'react';
import { Button } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';

const iconSize = 20;

export default function AppButton({
  action = "add",
  label,
  props
}) {
  const BuildIcon = () => {
    if (action === "add") {
      return <IoAddCircleOutline size={iconSize} className="me-2" />;
    }
  }

  return (
    <Button {...props}>
      <div className="d-flex align-items-center">
        <BuildIcon />
        <span>{label}</span>
      </div>
    </Button>
  )
}
