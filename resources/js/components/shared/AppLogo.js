import React from 'react';
import { PATH_STORAGE } from '../../services/api';
import { useApp } from '../App';

export default function AppLogo(props) {
  const { config } = useApp();

  return (
    <img src={`${PATH_STORAGE}/${config.app_logo}`} {...props} alt="AppLogo" />
  )
}
