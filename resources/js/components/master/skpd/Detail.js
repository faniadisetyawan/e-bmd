import React from 'react';
import { Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

export default function Detail() {
  const { kode } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [response, setResponse] = React.useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/refer/skpd/${kode}`);
      setResponse(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData();

  }, [kode]);

  return (
    <React.Fragment>
      {loading && (
        <div className="mb-3">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}

      <Row>
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <p className="lead">Kode SKPD</p>
                <div>{response?.kode}</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <p className="lead">Nama SKPD</p>
                <div>{response?.nama}</div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>Lokasi...</Col>
      </Row>
    </React.Fragment>
  )
}
