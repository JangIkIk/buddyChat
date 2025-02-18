import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

export const BaseLayout = () => {
    return (
        <>
            <Header/>
            <main className='tw:pt-15'>
            <Outlet/>
            </main>
        </>
    );
}