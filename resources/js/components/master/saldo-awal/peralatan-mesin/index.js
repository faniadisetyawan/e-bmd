import React from 'react';
import { Button } from 'react-bootstrap';

export default function PeralatanMesin() {
  return (
    <React.Fragment>
      <p className="mb-5 blockquote-footer">Peralatan dan Mesin</p>

      <div className="mb-3">
      <Button variant="light" className="me-2 text-success">Import</Button>
        <Button variant="light" className="text-danger">Delete all records</Button>
      </div>
    </React.Fragment>
  )
}
