import React from 'react';
import { Card } from 'react-bootstrap';
import AppContent from '../shared/layouts/AppContent';

export default function Dashboard() {
  return (
    <AppContent>
      <Card body>
        <div style={{ minHeight: '1000px' }}>Dashboard</div>
      </Card>
    </AppContent>
  )
}
