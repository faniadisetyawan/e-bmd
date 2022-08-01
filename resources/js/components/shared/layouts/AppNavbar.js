import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useApp } from '../../App';
import AppLogo from '../AppLogo';
import { NavLink } from 'react-router-dom';

export default function AppNavbar({ onLogout }) {
  const { config, user } = useApp();

  return (
    <div className="navbar-wrapper d-flex align-items-center bg-primary text-light">
      <div className="navbar-header centered">
        <AppLogo height={50} className="me-2" />
        <div className="d-flex flex-column">
          <h5 className="my-0 fw-bold">{config?.app_name}</h5>
          <small className="d-block">Version {config?.app_version}</small>
        </div>
      </div>

      <div className="navbar-body">
        <div className="w-100 px-3 between">
          <div className="d-none d-md-block">
            <figure className="my-0">
              <blockquote className="blockquote">
                <p>{config?.app_description}</p>
              </blockquote>
              <figcaption className="blockquote-footer mb-0 text-light">
                {config?.nama_pemda}
              </figcaption>
            </figure>
          </div>

          <div>
            <Dropdown>
              <Dropdown.Toggle variant="light">
                {user?.pegawai?.nama}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="dropdown-item">
                  <figure className="text-end">
                    <blockquote className="blockquote">
                      <small>{user?.pegawai?.skpd?.nama}</small>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      {user?.pegawai?.jabatan?.uraian}
                    </figcaption>
                  </figure>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item as={NavLink} to="/auth/profile">My Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}
