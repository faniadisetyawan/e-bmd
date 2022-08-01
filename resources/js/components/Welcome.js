import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useApp } from './App';
import AppLogo from './shared/AppLogo';

export default function Welcome() {
  const { config, user } = useApp();

  if (!!user) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="py-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bolder">{config?.app_name}</h1>

      <figure className="text-center">
        <blockquote className="blockquote">
          <p>{config?.app_description}</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          Version {config?.app_version}
        </figcaption>

        <figcaption className="blockquote-footer">
          {config?.nama_pemda}
        </figcaption>
      </figure>

      {config && <AppLogo width={120} className="my-3" />}

      <p className="mb-5">Tahun Anggaran {config?.tahun_anggaran}</p>

      <Button as={Link} to={!!user ? "/dashboard" : "/auth/login"} variant="primary" size="lg">
        {!!user ? "Mulai" : "Log in"}
      </Button>
    </div>
  )
}
