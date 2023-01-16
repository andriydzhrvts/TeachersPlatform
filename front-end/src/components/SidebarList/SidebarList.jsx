import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI library
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { pendingSubscriptionsCount } from 'store/pending-subscriptions-slice';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseUser,
  faCalendarDays,
  faSpellCheck,
  faBook,
  faUserGraduate,
  faSackDollar,
  faRightFromBracket,
  faChalkboardUser,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { logout } from 'services/authService';
import { socket } from 'services/socketService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './SidebarList.module.scss';
import Badge from '@mui/material/Badge';

// Constants
import { STUDENT_ROLE } from 'constants/userRoles';

export const SidebarList = ({ showSidebar }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const { subscriptions } = useSelector((state) => state.approveStudent);

  const dispatchFunction = useDispatch();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handlePathTo = () => {
    showSidebar(false);
  };

  useEffect(() => {
    dispatchFunction(pendingSubscriptionsCount({ statusName: 'pending', id: currentUser.roleId }));
  });

  useEffect(() => {
    socket.on('create_subscription', () => {
      dispatchFunction(
        pendingSubscriptionsCount({ statusName: 'pending', id: currentUser.roleId }),
      );
    });
    socket.on('delete_subscription', () => {
      dispatchFunction(
        pendingSubscriptionsCount({ statusName: 'pending', id: currentUser.roleId }),
      );
    });
  });

  const isActive = ({ isActive }) =>
    isActive ? `${styles.sidebarLink} ${styles.active}` : styles.sidebarLink;

  return (
    <div className={styles.sidebarMenu}>
      <List className={styles.sidebarList}>
        <ListItem className={styles.sidebarItem}>
          <NavLink to='/app' className={isActive} end={true} onClick={handlePathTo}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faHouseUser} />
            Dashboard
          </NavLink>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink to='/app/calendar' className={isActive} onClick={handlePathTo}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faCalendarDays} />
            Calendar
          </NavLink>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink to='/app/materials' className={isActive} onClick={handlePathTo}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faBook} />
            Materials
          </NavLink>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink to='/app/questions' className={isActive} onClick={handlePathTo}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSpellCheck} />
            Grammar
          </NavLink>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          {currentUser?.role === STUDENT_ROLE ? (
            <NavLink to='/app/teachers' className={isActive} onClick={handlePathTo}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faChalkboardUser} />
              Teachers
            </NavLink>
          ) : (
            <NavLink to='/app/subscriptions' className={isActive} onClick={handlePathTo}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faUserGraduate} />
              <Badge badgeContent={subscriptions} color='primary' className={styles.sidebarBadge}>
                Students
                {subscriptions > 0 && <div className={styles.pulseWave}></div>}
              </Badge>
            </NavLink>
          )}
        </ListItem>
        {currentUser?.role === STUDENT_ROLE && (
          <ListItem className={styles.sidebarItem}>
            <NavLink to='/app/subscriptions' className={isActive} onClick={handlePathTo}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faBell} />
              Subscriptions
            </NavLink>
          </ListItem>
        )}
        <ListItem className={styles.sidebarItem}>
          <NavLink to='/app/finances' className={isActive} onClick={handlePathTo}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSackDollar} />
            Finances
          </NavLink>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink onClick={handleLogout} to='/login' className={isActive}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faRightFromBracket} />
            Logout
          </NavLink>
        </ListItem>
      </List>
    </div>
  );
};

//propTypes
SidebarList.propTypes = {
  showSidebar: PropTypes.func,
};
