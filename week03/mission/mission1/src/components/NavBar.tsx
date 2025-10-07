import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const LINKS = [
    { to: '/', label: 'Home' },
    { to: '/movies/popular', label: 'Popular' },
    { to: '/movies/now_playing', label: 'Now-Playing' },
    { to: '/movies/upcoming', label: 'Upcoming' },
];
export const NavBar = () : Element => {

    return (
    <div className='flex gap-4 p-4 justify-center item-center'>
        {LINKS.map(({to, label}) => (
            <NavLink
            key={to}
            to={to}
            className={({isActive}) : any =>{
                return isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500 ';
            }}
            >
            {label}
            </NavLink>
        ))}
    </div>
    );
};
