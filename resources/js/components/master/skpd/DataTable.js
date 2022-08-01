import React from 'react';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import { IoCaretForward } from 'react-icons/io5';
import api from '../../../services/api';

export default function DataTable() {
  const [loading, setLoading] = React.useState(true);
  const [response, setResponse] = React.useState([]);

  const fetchPengguna = async () => {
    setLoading(true);
    try {
      const { data: resp } = await api.get(`/refer/skpd/pengguna`);
      setResponse(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchPengguna();
  }, []);

  return (
    <React.Fragment>
      <div className="mt-5 mb-3 d-flex align-items-center">
        <Button variant="light" className="text-secondary" onClick={fetchPengguna}>
          {"Refresh"}
        </Button>
      </div>

      {loading ? 
        <div className="mb-3">
          <Spinner animation="border" variant="secondary" />
        </div>
        :
        <ListGroup className="tree">
          {response?.map((obj, i) => (
            <React.Fragment key={i}>
              <ListGroup.Item className="d-flex">
                <div className="flex-shrink-0">
                  <div className="d-flex align-items-center">
                    {!!obj.children && (
                      <div
                        className="indicator pointer me-2"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseChild_${i}`}
                        aria-expanded="false"
                        aria-controls={`collapseChild_${i}`}
                      >
                        <IoCaretForward className="icon-arrow" />
                      </div>
                    )}
                    <span style={{ marginLeft: !!obj.children ? 'unset' : '1.5rem' }}>
                      {obj.kode}
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  {obj.nama}
                </div>
              </ListGroup.Item>

              {!!obj.children && obj.children?.map((child, iChild) => (
                <BuildTree key={iChild} data={child} indexRoot={i} indexElement={`${i}_${iChild}`} />
              ))}
            </React.Fragment>
          ))}
        </ListGroup>
      }
    </React.Fragment>
  )
}

const BuildTree = ({ data, indexRoot, indexElement }) => {
  return (
    <React.Fragment>
      <ListGroup.Item className="collapse" id={`collapseChild_${indexRoot}`}>
        <div className="d-flex children">
          <div className="flex-shrink-0">
            <div className="d-flex align-items-center">
              {!!data.children && (
                <div
                  className="indicator pointer me-2"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseChild_${indexElement}`}
                  aria-expanded="false"
                  aria-controls={`collapseChild_${indexElement}`}
                >
                  <IoCaretForward className="icon-arrow" />
                </div>
              )}
              <span style={{ marginLeft: !!data.children ? 'unset' : '1.5rem' }}>
                {data.kode}
              </span>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            {data.nama}
          </div>
        </div>
      </ListGroup.Item>

      {!!data.children && data.children?.map((obj, i) => (
        <BuildTree key={i} data={obj} indexRoot={indexElement} indexElement={i} />
      ))}
    </React.Fragment>
  )
}
