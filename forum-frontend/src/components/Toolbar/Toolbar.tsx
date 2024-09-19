import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectorUser} from '../../store/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const Toolbar = () => {
  const user = useAppSelector(selectorUser);

  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>Forum</NavLink>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <AnonymousMenu />
        )}
      </div>
    </nav>
  );
};

export default Toolbar;