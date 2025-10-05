import Navbar from './Navbar';
import ThemeContent from './ThemeContent';

export default function ContextPage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full'>
            <Navbar />
            <main className='flex-1 w-full'>
                <ThemeContent />
            </main>
        </div>
    );
}
