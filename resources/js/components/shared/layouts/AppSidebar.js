import React from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../App';
import { VscChevronDown } from 'react-icons/vsc';
import classNames from 'classnames';

export const BuildModule = () => {
  const { refer } = useApp();
  const navigation = refer?.navigation;

  return (
    <ul className="nav flex-column">
      {navigation?.map((root, iRoot) => {
        if (!!root.children) {
          return <BuildTree key={iRoot} data={root} />;
        } else {
          return (
            <li key={iRoot} className="nav-item">
              <NavLink to={root.url} className="nav-link">{root.label}</NavLink>
            </li>
          )
        }
      })}
    </ul>
  )
}

const BuildTree = ({ data }) => {
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const isOpen = location.pathname.startsWith(data.url);
    setOpen(isOpen);
  }, [location]);

  return (
    <li className="nav-item">
      <div className={classNames('nav-link pointer', {'active': open})} onClick={() => setOpen(!open)}>
        <div className="between">
          {data.label}
          <VscChevronDown className="icon-arrow" />
        </div>
      </div>

      <Collapse in={open} dimension="height">
        <ul className="nav flex-column ms-3 children">
          {data.children?.map((route, i) => {
            if (!!route.children) {
              return <BuildTree key={i} data={route} />
            } else {
              return (
                <li key={i} className="nav-item">
                  <NavLink to={route.url} className="nav-link">{route.label}</NavLink>
                </li>
              )
            }
          })}
        </ul>
      </Collapse>
    </li>
  )
}

export default function AppSidebar() {
  return (
    <div className="sidebar-wrapper main bg-white">
      <BuildModule />
    </div>
  )
}
